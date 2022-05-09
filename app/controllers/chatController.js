const Chat = require("../models/Chat")

exports.getAllChats = async (req, res, next) => {
    try {
        const token = findToken(req)
        const id = decode(token).id
    
        const chats = await Chat.find({ user : id })
            .populate('users.lookup', ['profile'])
            .select('-password')
            .exec();
    
        if (!chats) {
            return res.status(404).json({ message: 'کاربری وجود ندارد' });
        }

        return res.status(404).json(chats);

    } catch (error) {
        next(error)
    }
}

exports.createNewChat = async (req, res, next) => {
    
}