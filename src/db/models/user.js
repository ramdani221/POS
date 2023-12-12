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
      User.hasMany(models.Purchase, {
        foreignKey: 'operator'
      })
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
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (user, options) => {
        user.password = hashSync(user.password, saltRounds)
      }
    },
    defaultScope: {
      attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
    },
    sequelize,
    modelName: 'User',
  });

  return User;
};