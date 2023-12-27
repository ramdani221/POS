'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Saleitem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Saleitem.belongsTo(models.Sale, {
        foreignKey: 'invoice'
      })
      Saleitem.belongsTo(models.Good, {
        foreignKey: 'itemcode'
      })
    }
  }
  Saleitem.init({
    invoice: DataTypes.INTEGER,
    itemcode: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    sellingprice: DataTypes.DECIMAL,
    totalprice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Saleitem',
  });
  return Saleitem;
};