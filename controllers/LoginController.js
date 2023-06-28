const jwt = require("jsonwebtoken");
const config = require("../config/secret");
const UserModel = require("../models").User;
class LoginController {
  /**
   *
   * @param {*} req
   * @param {*} res
   *
   * Login Function
   */
  async index(req, res) {
    let user = await UserModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(404).json("User not exists");
    let pass = await bcrypt.compare(req.body.password, user.password);
    if (!password) return res.status(404).json("Invalid credentials");
    let token = jwt.sign(
      {
        data: user,
      },
      config.key,
      { expiresIn: 60 * 60 }
    );
    if (token) return res.status(200).json({ data: user, token: token });
  }
}
module.exports = new LoginController();
