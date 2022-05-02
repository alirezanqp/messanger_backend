const User = require('../models/User')
const { compare, hash } = require('../services/hash')
const { sign } = require('../services/TokenService')

module.exports.register = async(req, res, next) => {
    try {
        const { username, email } = req.body

        // check username
        const usernameCheck = await User.findOne({
            username: username
        })
        if (usernameCheck) {
            return res.status(400).json({ message: 'نام کاربری تکراری می باشد'})
        }

        // check user email
        
        const user = await User.findOne({
            email: email
        })
        if (user) {
            return res.status(400).json({ message: 'کاربری با این ایمیل در سیستم وجود دارد.'})
        }
        
        // hash password 
        
        const password = await hash(req.body.password)

        //save user data
        const newUser = new User({
            email,
            username,
            password
        })
        
        await newUser.save()
        res.status(200).json({ message: 'ثبت نام با موفقیت انجام شد'})
    } catch (error) {
        next(error)
    }
}

module.exports.login = async(req, res, next) => {
    try {

        // check user validation
        const user = await User.findOne({ 
            $or: [
                { email: req.body.emailOrUsername },
                { username: req.body.emailOrUsername }
            ] 
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
        const token = sign({ id: user._id})
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