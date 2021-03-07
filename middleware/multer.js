const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 2000001
    },
    fileFilter: (req, file, cb) => {
        if(file.originalname.endsWith('png') || file.originalname.endsWith('jpg') || file.originalname.endsWith('jpeg'))
            return cb(null, true)
        else
            return cb("Please upload images only", false)
    }
})
// File gets saved in req.file
module.exports = upload