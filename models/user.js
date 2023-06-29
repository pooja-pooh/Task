"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: {
        type: Sequelize.ENUM,
        values: ["male", "female", "other"],
      },
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      status: {
        type: Sequelize.ENUM,
        values: ["active", "pending", "deleted"],
      },
      date: DataTypes.DATE,
      profile_pic: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
