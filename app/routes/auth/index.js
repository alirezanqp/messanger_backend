const { register } = require('../../controllers/authController')

const router = require('express').Router()


router.post('/auth/register' , register)

router.post('/auth/login', )

module.exports  = router