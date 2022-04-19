const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const { sign } = require('../services/TokenService')
const prisma = new PrismaClient()

module.exports.register = async(req, res) => {
    try {
        // check user email
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        },
    })
    if (user) {
        return res.status(400).json({ msg: 'کاربری با این ایمیل در سیستم وجود دارد.'})
    }
    
    const { name, email } = req.body

    // hash password 
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    //save user data
    await prisma.user.create({
       data: {
        name,
        email,
        password
       } 
    })
    res.status(200).json({ msg: 'ثبت نام با موفقیت انجام شد'})
    } catch (error) {
        next(error)
    }
}

module.exports.login = async(req, res, next) => {
    try {
        // check user validation
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        },
    })
    if (!user) {
        return res.status(400).json({ msg: 'ایمیل یا رمز عبور اشتباه می باشد'})
    }

    // check password validation
    const isValid = await bcrypt.compare(req.body.password, user.password)
    if (!isValid) {
        return res.status(400).json({ msg: 'ایمیل یا رمز عبور اشتباه می باشد'})
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