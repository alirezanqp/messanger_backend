const mongoose = require('mongoose') 

const Schema = mongoose.Schema

const roomSchema = new Schema(
    {
        name : {
            type : String,
            trim: true,
            required:  true,
            unique: true,
            minlength: ['3', 'Room name should be greater than 3 characters'],
            maxlength: ['20', 'Room name should be less than 20 characters']
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        access: {
            type: Boolean,
            default: true
        },
        accessIds: {
            type: Array,
            default: []
        },
        users: [
            {
                _id: false,
                lookup: {
                    type: Schema.Types.ObjectId,
                    required: true,
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
            updatedAt: 'updated_at'
        }
    }
)

module.exports =  mongoose.model( 'Room' , roomSchema)