const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
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
            return res.status(400).json({ msg: 'نام کاربری تکراری می باشد'})
        }
        // check user email
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            },
        })
        if (user) {
            return res.status(400).json({ msg: 'کاربری با این ایمیل در سیستم وجود دارد.'})
        }
        
        const { username, email } = req.body

        // hash password 
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)

        //save user data
        await prisma.user.create({
            data: {
              username,
              email,
              password
            } 
        })
        res.status(200).json({ msg: 'ثبت نام با موفقیت انجام شد'})
    } catch (error) {
        console.log(error)
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
        return res.status(400).json({ msg: 'اطلاعات وارد شده اشتباه است'})
    }

    // check password validation
    const isValid = await bcrypt.compare(req.body.password, user.password)
    if (!isValid) {
        return res.status(400).json({ msg: 'اطلاعات وارد شده اشتباه است'})
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