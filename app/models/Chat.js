const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        participant:[
            {
                _id: false,
                lookup : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                socketId: {
                    type: String,
                    required: true
                }
            }
        ]
    }, 
    {
        timestamps: {
            createdAt: 'created_at',
        }
    }    
)

module.exports = mongoose.model('Chat', chatSchema)