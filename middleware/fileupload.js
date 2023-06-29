const multer = require('multer');
const { v4: uuidv4 } = require("uuid");
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: function (req, file, cb) {
        cb(null, "./images");
    },
    // destination: 'images',
    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        // cb(null, `${uniqueSuffix}-${file.originalname}`);
        cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    }
});
const fileupload = multer({ imageStorage });
module.exports = fileupload