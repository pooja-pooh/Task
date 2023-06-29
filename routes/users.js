var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");
const AuthMiddleware = require("../middleware/auth");
const fileupload = require('../middleware/fileupload')
/* GET users listing. */
router.post("/", fileupload.single('profile_pic'), UserController.store);
router.get("/", AuthMiddleware.getToken, UserController.index);
router.get("/create", AuthMiddleware.getToken, UserController.create);
router.get("/edit/:id", AuthMiddleware.getToken, UserController.edit);
/* GET users listing. */
/* GET users listing. */
router.put("/:id", AuthMiddleware.getToken, UserController.update);
/* GET users listing. */
router.get("/delete/:id", AuthMiddleware.getToken, UserController.destroy);

module.exports = router;
