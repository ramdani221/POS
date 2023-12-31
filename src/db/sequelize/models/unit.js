'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Unit.hasMany(models.Good, {
        foreignKey: 'unit'
      })
    }
  }
  Unit.init({
    unit: DataTypes.STRING,
    name: DataTypes.STRING,
    note: DataTypes.TEXT
  }, {
    defaultScope: {
      attributes: {exclude: ['createdAt', 'updatedAt']}
    },
    sequelize,
    modelName: 'Unit',
  });
  return Unit;
};