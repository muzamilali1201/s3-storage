const multer = require("multer");

const storage = {
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now().toString();
    cb(null, uniqueSuffix + file.originalname);
  },
};

const upload = multer(storage);
module.exports = upload;
