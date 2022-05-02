const { PrismaClient } = require('@prisma/client')
const { compare, hash } = require('../services/hash')
const { sign } = require('../services/TokenService')
const prisma = new PrismaClient()

module.exports.register = async(req, res, next) => {
    try {
        // check username
        const usernameCheck = await prisma.user.findUnique({
            where: {
                username: req.body.username,
            },
        })
        if (usernameCheck) {
            return res.status(400).json({ message: 'نام کاربری تکراری می باشد'})
        }
        // check user email
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            },
        })
        if (user) {
            return res.status(400).json({ message: 'کاربری با این ایمیل در سیستم وجود دارد.'})
        }
        
        const { username, email } = req.body

        // hash password 
        
        const password = await hash(req.body.password)

        //save user data
        await prisma.user.create({
            data: {
              username,
              email,
              password
            } 
        })
        res.status(200).json({ message: 'ثبت نام با موفقیت انجام شد'})
    } catch (error) {
        next(error)
    }
}

module.exports.login = async(req, res, next) => {
    try {
        // check user validation
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    email: req.body.emailOrUsername
                },
                {
                    username: req.body.emailOrUsername
                }
            ]
        }
    })
    if (!user) {
        return res.status(400).json({ message: 'اطلاعات وارد شده اشتباه است'})
    }

    // check password validation
    const isValid = await compare(req.body.password, user)
    if (!isValid) {
        return res.status(400).json({ message: 'اطلاعات وارد شده اشتباه است'})
    }

    // login success and send token
    const token = sign({_id: user.id})
    res.status(200).json({
        status: 'success',
        data: {
            token
        }
    })
    } catch (error) {
        next(error)
    }
}