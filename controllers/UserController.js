const UserModel = require("../models").User;
const bcrypt = require("bcrypt");

class UserController {
  async index(req, res) {
    let usersList = await UserModel.findAll({});
    console.log(userList);
  }

  async store(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    let userCreate = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      status: req.body.status,
      date: req.body.date,
      profile_pic: req.body.profile_pic,
    });
    console.log(userCreate);
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
          id: req.pramas.id,
        },
      }
    );
    console.log(userUpdate);
  }

  async destroy(req, res) {
    let userDestory = await UserModel.delete({
      where: {
        id: req.pramas.id,
      },
    });
    console.log(userDestory);
  }
}
module.exports = new UserController();
