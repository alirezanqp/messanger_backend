const Message = require("../models/Message");

exports.createNewMessage = async (req, res, next) => {
    try {
        if (!req.body.content) {
            return res.json({ param: 'no_content', message: 'پیام نمی تواند خالی باشد' });
        }
    
        const newMessage = new Message({
            content : req.body.content,
            user: req.user.id
        })
    
        if (req.body.room) {
           newMessage.room = req.body.room
        } else {
            newMessage.chat = req.body.chat
        }
    
        await newMessage.save()
        return res.status(200).json(newMessage);
    } catch (error) {
        next(error)
    }
}

exports.getRoomMessages = async(req, res, next) => {
    try {
        const messages = await Message.find({ room: req.body.room_id })

        if (!messages) {
            return res.status(404).json({ message: 'پیامی وجود ندارد' });
        }

        return res.status(200).json(messages);

    } catch (error) {
        next(error)
    }
}

exports.getChatMessages = async(req, res, next) => {
    try {
        const messages = await Message.find({ room: req.param.chat_id })

        if (!messages) {
            return res.status(404).json({ message: 'پیامی وجود ندارد' });
        }

        return res.status(200).json(messages);

    } catch (error) {
        next(error)
    }
}