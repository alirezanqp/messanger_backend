const User = require("../models/User")
const { decode, findToken } = require("../services/TokenService")

exports.getAllUsers = async(req, res, next) => {
    const users = await User.find({}, 'username profile').exec()

    if (users) {
        return res
            .status(200)
            .json(users)
            .end();
    } else {
        return res.status(404).json({ error: 'کاربری وجود ندارد!' });
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        let filePath;
        if (req.file) {
            const [pu, up, pa] = req.file.path.split('/')
            const path = `${up}/${pa}`
    
            filePath = `${req.protocol}://${req.hostname}:${process.env.APP_PORT}/${path}`
        }
        const token = findToken(req)
        const id = decode(token).id

        const updatedProfile = {
            profile: {
                ...req.body,
                image: filePath || null
            }
        }
    
        await User.findByIdAndUpdate(id, updatedProfile)

        res.status(200).json({
            success: true,
            data: updatedProfile,
            message: 'پروفایل با موفقیت بروزرسانی شد'
        })

    } catch (error) {
        next(error)
    }
}
