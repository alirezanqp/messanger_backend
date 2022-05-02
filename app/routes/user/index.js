const router = require('express').Router()
const { getAllUsers, updateProfile, getProfile } = require('../../controllers/user.controller')

const upload = require('../../services/multer')

router.get('/users', getAllUsers)
router.get('/profile', getProfile)
router.put('/profile', upload.single('image') , updateProfile)

module.exports  = router