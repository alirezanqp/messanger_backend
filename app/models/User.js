const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            sparse: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            maxlength: ['15', 'Username should be less than 15 characters']
        },
        password: {
            type: String,
            required: true,
            trim : true
        },
        profile: {
            name: {
                type: String,
                default: null
            },
            biography: {
                type: String,
                default: null
            },
            image: {
                data: Buffer,
                contentType: String
            }
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
)

module.exports = mongoose.model('User', userSchema)