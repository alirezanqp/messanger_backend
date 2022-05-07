const router = require('express').Router()
const { getAllUsers, updateProfile} = require('../../controllers/user.controller')

const upload = require('../../services/multer')

router.get('/users', getAllUsers)
router.put('/profile', upload.single('image') , updateProfile)

module.exports  = router