const jwt = require("jsonwebtoken");
const config = require("../config/secret");
const UserModel = require("../models").User;
const bcrypt = require("bcrypt");

class LoginController {
  /**
   *
   * @param {*} req
   * @param {*} res
   *
   * Login Function
   */
  async index(req, res) {
    if (req.cookies.jwt) {
      return res.redirect("/users");
    }
    return res.render("partial/login", { req });
  }

  // async index(req, res) {
  //   return res.render('partial/index');
  // }

  async login(req, res) {
    try {
      let user = await UserModel.findOne({
        where: {
          email: req.body.email,
          status: "active",
        },
      });
      if (!user) {
        req.toastr.error("User not exists.");
        return res.redirect("/");
      }
      let pass = await bcrypt.compare(req.body.password, user.password);
      if (!pass) {
        req.flash("error", "Invalid credentials.");
        return res.redirect("/");
      }
      let token = jwt.sign(
        {
          data: user,
        },
        config.key,
        { expiresIn: 60 * 60 }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 900000, // 3hrs in ms
      });
      if (token) {
        req.flash("success", "Login success");
        return res.redirect("/users");
      }
    } catch (error) {
      req.flash("error", "Sothing went wrong");
      return res.redirect("/");
    }
  }
  /**
   * Logout
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async logout(req, res) {
    res.clearCookie("jwt");
    req.flash("success", "User logout");
    // res.render('/', { expressFlash: req.flash('success') });
    //     <% if (expressFlash.length > 0) { %>
    //   <p>Message: <%= expressFlash %> </p>
    // <% } %>
    return res.redirect("/");
  }
}
module.exports = new LoginController();
