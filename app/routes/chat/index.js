const router = require('express').Router()

const { getAllChats, createNewChat } = require('../../controllers/chatController')

router.get('/',  getAllChats)
router.post('/', createNewChat)

module.exports  = router