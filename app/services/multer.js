const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  'public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const [ ot,imagetype] = file.mimetype.split('/')
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + imagetype)
    },
})

const upload = multer({ storage: storage })

module.exports = upload