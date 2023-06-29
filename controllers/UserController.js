const UserModel = require("../models").User;
const bcrypt = require("bcrypt");



class UserController {
  async index(req, res) {
    let url = process.env.imageUrl
    let usersList = await UserModel.findAll({});
    return res.render('partial/index', { usersList: usersList, url: url });
  }
  async create(req, res) {
    return res.render('partial/register');
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
      profile_pic: req.file.originalname,
    });
    return res.redirect('/');
  }
  async edit(req, res) {
    let user = await UserModel.findOne({
      where: {
        id: req.params.id
      }
    })
    return res.render('partial/edit', { user: user });
  }
  async update(req, res) {
    let userUpdate = await UserModel.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        status: req.body.status,
        date: req.body.date,
        profile_pic: req.body.profile_pic,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.redirect('/users');
  }
  async destroy(req, res) {
    let userDestory = await UserModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.redirect('/users');
  }
}
module.exports = new UserController();
