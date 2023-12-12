'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Good extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Good.belongsTo(models.Unit, {
        foreignKey: 'unit'
      })
      Good.hasMany(models.Purchaseitem, {
        foreignKey: 'itemcode'
      })
    }
  }
  Good.init({
    barcode: DataTypes.STRING,
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    purchaseprice: DataTypes.DECIMAL,
    sellingprice: DataTypes.DECIMAL,
    unit: DataTypes.INTEGER,
    picture: DataTypes.TEXT,
  }, {
    defaultScope: {
      attributes: {exclude: ['createdAt', 'updatedAt']}
    },
    sequelize,
    modelName: 'Good',
  });
  return Good;
};