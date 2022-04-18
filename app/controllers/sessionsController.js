const userModel = require('../models/userModel')
const { sign } = require('../services/TokenService')

module.exports.newSession = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await userModel.findOne({ email: email })
    if (!user) {
      return res.status(404).send({
        status: 'error',
        code: 404,
        msg: 'آدرس ایمیل یا کلمه عبور اشتباه است'
      })
    }

    const token = sign({ id: user._id })
    res.send({
      status: 'succses',
      code: 200,
      token
    })
  } catch (error) {
    next(error)
  }
}
