const config = require("../config/secret");
const jwt = require("jsonwebtoken");

class AuthMiddleware {
  async getToken(req, res) {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json("Unauthorize user");

    try {
      const decoded = jwt.verify(token, config.key);
      req.user = decoded;
      next();
    } catch (e) {
      res.status(400).json("Token not valid");
    }
  }
}
module.exports = new AuthMiddleware();
