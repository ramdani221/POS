'use strict';
const { hashSync, compareSync } = require('bcrypt');
const saltRounds = 10;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    };

    checkPassword = (password) => {
      return compareSync(password, this.password)
    }

    sendData = () => {
      return {id: this.id, email: this.email, name: this.name, role: this.role}
    }
  }
  User.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', hashSync(value, saltRounds))
      }
    },
    role: DataTypes.STRING
  }, {
    defaultScope: {
      attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
    },
    sequelize,
    modelName: 'User',
  });

  return User;
};