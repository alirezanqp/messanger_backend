const { register, login } = require('../../controllers/authController')
const { registerValidator, validate, loginValidator } = require('../../validator/auth')

const router = require('express').Router()

router.post('/auth/register' ,registerValidator(), validate, register)

router.post('/auth/login', loginValidator(), validate, login)

module.exports  = router