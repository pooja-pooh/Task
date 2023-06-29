const UserModel = require("../models").User;
const bcrypt = require("bcrypt");
const moment = require("moment");
class UserController {
  async index(req, res) {
    let url = process.env.imageUrl ?? "http://localhost:3001/images";
    console.log(url, "url");
    let usersList = await UserModel.findAll({});
    return res.render("partial/index", {
      usersList: usersList,
      url: url,
      moment,
    });
  }
  async create(req, res) {
    return res.render("partial/register");
  }
  async store(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    let userCreate = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      gender: req.body.gender,
      status: req.body.status,
      date: req.body.date,
      profile_pic: req.file?.filename ?? "1688055876313bulb.jpg",
    });
    return res.redirect("/");
  }
  async edit(req, res) {
    let url = process.env.imageUrl ?? "http://localhost:3001/images";
    let user = await UserModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.render("partial/edit", { user: user, moment, url });
  }
  async update(req, res) {
    let userUpdate = await UserModel.update(
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        status: req.body.status,
        date: req.body.date,
        profile_pic: req.file?.filename,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    return res.redirect("/users");
  }
  async destroy(req, res) {
    let userDestory = await UserModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.redirect("/users");
  }
}
module.exports = new UserController();
