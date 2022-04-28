const { register, login } = require('../../controllers/authController')
const { registerValidator, validate, loginValidator } = require('../../validator/auth')

const router = require('express').Router()

router.post('/register' ,registerValidator(), validate, register)

router.post('/login', loginValidator(), validate, login)

module.exports  = router