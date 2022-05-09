const router = require('express').Router()

const { createNewMessage, getRoomMessages, getChatMessages } = require('../../controllers/messageController')

router.post('/', createNewMessage)
router.get('/room',  getRoomMessages)
router.get('/chat',  getChatMessages)

module.exports  = router