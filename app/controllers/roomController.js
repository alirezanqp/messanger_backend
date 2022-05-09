const Room = require('../models/Room')

exports.createRoom = async (req, res, next) => {
    const { room_name, } = req.body.room_name 
    const room = await Room.findOne({name: room_name})

    if (room.name === room_name) {
        res.status(400).json({
            message: 'نام گروه تکراری می باشد'
        })
    }

    const newRoom = {
        room_name
    }
}