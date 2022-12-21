const util = require("util");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
      cb(null, '../frontend/src/components/image');
  },
  filename: function (_req, file, cb) {
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (_req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });
var uploadFilesMiddleware = util.promisify(upload);
module.exports = uploadFilesMiddleware;