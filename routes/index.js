const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController");
/* GET home page. */
router.get("/", LoginController.index);
router.post("/", LoginController.login);
router.get("/logout", LoginController.logout);
// router.get("/register", LoginController.register);

module.exports = router;
