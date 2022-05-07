const { init } = require('../../controllers/initController')
const auth = require('../../middlewares/auth')
const router = require('express').Router()

router.post('/', auth, init)

module.exports  = router