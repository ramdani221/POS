'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchaseitem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Purchaseitem.belongsTo(models.Purchase, {
        foreignKey: 'invoice'
      })
      Purchaseitem.belongsTo(models.Good, {
        foreignKey: 'itemcode'
      })
    }
  }
  Purchaseitem.init({
    invoice: DataTypes.INTEGER,
    itemcode: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    purchaseprice: DataTypes.DECIMAL,
    totalprice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Purchaseitem',
  });
  return Purchaseitem;
};