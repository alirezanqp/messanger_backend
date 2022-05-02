const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        content : {
            type: String,
            require: true,
            trim: true
        },
        room: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Room'
        },
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: {
            createdAt: 'created_at'
        }
    }
)

module.exports = mongoose.model('Message', messageSchema)