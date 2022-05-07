const User = require('../models/User')

exports.init = async (req, res, next) => {
    try {
        const token = findToken(req)
        const id = decode(token).id
        
        const user = await User.findById(id, 'username profile')
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(error)
    }
}