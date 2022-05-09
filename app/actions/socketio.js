const mongoose = require('mongoose')
const Chat = require('../models/Chat')
const Message = require('../models/Message')
const Room = require('../models/Room')

module.exports = {
    ADD_CHAT_MESSAGE: async data => {
        const newMessage = await new Message({
            content: data.content,
            user: data.user ? data.user._id : null,
            chat: data.chat._id
        }).save()

        return Message.populate(newMessage, {
            path: 'user',
            select: 'username profile'
        });
    },
    GET_CHAT_MESSAGES: async data => {
        return await Message.find({ room: data.chat._id }).populate('user', [
            'username',
            'profile'
        ]);
    },
    GET_CHATS: async () => {
        return await Chat.find({})
            .populate('user participant.lookup', ['username', 'profile'])
            .select('-password');
    },
}