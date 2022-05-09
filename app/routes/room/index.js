const router = require('express').Router()

const { createRoom } = require('../../controllers/roomController')

router.post('/', createRoom)

module.exports  = router