const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    console.log(file,"<<<FILE")
    const originalName = file.originalname;
    const extension = originalName.split('.').pop(); // get file extension
    cb(null, `${Date.now()}.${extension}`);
  },
})


const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb({ name: "invalidFile" ,
        message : "The file type has to be pdf"
      
      });
      }
  },
  onError: (error, next) => {
    next(error)
  },
})

module.exports = { upload, storage }