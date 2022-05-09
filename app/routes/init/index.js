const { init } = require('../../controllers/initController')

const router = require('express').Router()

router.post('/',  init)

module.exports  = router