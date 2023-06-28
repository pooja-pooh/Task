var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");
const AuthMiddleware = require("../middleware/auth");

/* GET users listing. */
router.get("/", AuthMiddleware.getToken, UserController.index);
/* GET users listing. */
router.post("/", AuthMiddleware.getToken, UserController.store);
/* GET users listing. */
router.put("/:id", AuthMiddleware.getToken, UserController.update);
/* GET users listing. */
router.delete("/:id", AuthMiddleware.getToken, UserController.destroy);

module.exports = router;
