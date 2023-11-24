const multer = require('multer')
const path = require('path')

const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
})

const fileImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Upload only images"), false);
  }
}

const upload = multer({ storage: documentStorage, fileFilter: fileImage })

module.exports = upload