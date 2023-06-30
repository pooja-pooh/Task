const UserModel = require("../models").User;
const bcrypt = require("bcrypt");
const moment = require("moment");
const { Op, Sequelize } = require("sequelize");
const converter = require("json-2-csv");
const fs = require('fs');
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
    req.flash("success", "User created successfully");
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
    req.flash("success", "User updated successfully");
    return res.redirect("/users");
  }
  async destroy(req, res) {
    let userDestory = await UserModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    req.flash("success", "User deleted successfully");
    return res.redirect("/users");
  }

  async getjsontoCsvData(req, res, next) {
    const temp = await UserModel.findAll({
      attributes: ['id', 'name', 'email', 'phone', 'gender', 'status', 'createdAt',
        [Sequelize.fn('date_format', Sequelize.col('createdAt'), '%m-%d-%Y'), 'createdAt'],],
      raw: true,
      nest: true,
    });
    const toDate = moment().format('Do-MMM-YYYY');
    const fileName = toDate + '.csv';


    // convert JSON array to CSV string
    // converter.json2csv({ data: temp[0], fields: ['id', 'name', 'email', 'phone', 'gender', 'status', 'createdAt'] }, function (err, csv) {
    //   if (err) {
    //     console.log('err', err);
    //     throw err;
    //   } else {
    //     console.log("runningkd")
    //     res.set('Content-Type', 'text/csv');
    //     res.setHeader('Content-disposition', `attachment; filename=data/${fileName}`);
    //     // create a file for csv and  CSV string save into file 
    //     console.log("tetst");
    //     fs.writeFileSync(`data/${fileName}`, csv)
    //     res.status(200).json({
    //       url: req.protocol + "://" + req.get("host") + "/data/" + fileName,
    //       status: true
    //     });
    //   }
    // });
    // try {
    const csv = await converter.json2csv(temp, {})

    if (csv) {
      fs.writeFileSync(`./data/${fileName}`, csv)
      // res.set('Content-Type', 'text/csv');
      // res.setHeader('Content-disposition', `attachment; filename=data/${fileName}`);
      // res.status(200).json({
      //   url: req.protocol + "://" + req.get("host") + '/' + fileName,
      //   status: true
      // });
      let path = './data/' + fileName;
      res.download(path, fileName);
    }

    //   console.log(data)

    // } catch (err) {
    //   console.log(err)
    // }

  }

}
module.exports = new UserController();
