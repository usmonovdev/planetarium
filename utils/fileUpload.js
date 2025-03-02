const multer = require("multer")
const path = require("path")

// Set storage
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "" + Date.now() + path.extname(file.originalname))
  }
})

// Upload
const upload = multer({
  storage: storage,
  limits: { fieldSize: 4000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  }
})

// Check file types
function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png|gif/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb("Error: You can upload only image files")
  }
}

module.exports = upload