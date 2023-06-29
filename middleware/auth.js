const config = require("../config/secret");
const jwt = require("jsonwebtoken");

class AuthMiddleware {
  async getToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) return res.redirect('/');

    try {
      const decoded = jwt.verify(token, config.key);
      req.user = decoded;
      next();
    } catch (e) {
      console.log(e.message);
      res.redirect('/');
    }
  }
}
module.exports = new AuthMiddleware();
