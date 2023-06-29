const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/images");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname, callback);
  },
});
const fileupload = multer({ storage });
module.exports = fileupload;
