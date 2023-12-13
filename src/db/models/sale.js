'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sale.init({
    invoice: DataTypes.STRING,
    totalsum: DataTypes.DECIMAL,
    pay: DataTypes.DECIMAL,
    change: DataTypes.DECIMAL,
    customer: DataTypes.INTEGER,
    operator: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};