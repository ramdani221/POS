'use strict';
const moment = require('moment');
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Purchase.belongsTo(models.Supplier, {
        foreignKey: 'supplier'
      })
      Purchase.belongsTo(models.User, {
        foreignKey: 'operator'
      })
      Purchase.hasMany(models.Purchaseitem, {
        foreignKey: 'invoice'
      })
    }

    static async generateInv() {
      const result = await Purchase.scope(null).findAll({
        where: { createdAt: { [Op.between]: [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)] } }
      })
      return `INV-${moment(new Date).format('YYYYMMDD')}-${result.length + 1}`
    }
  }
  Purchase.init({
    invoice: DataTypes.STRING,
    totalsum: DataTypes.DECIMAL,
    supplier: DataTypes.INTEGER,
    operator: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: async (purchase, options) => {
        purchase.invoice = await Purchase.generateInv()
      }
    },
    defaultScope: {
      where: {
        deleted: false
      }
    },
    sequelize,
    modelName: 'Purchase',
  });
  return Purchase;
};