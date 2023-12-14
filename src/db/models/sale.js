'use strict';
const moment = require('moment');
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sale.belongsTo(models.Customer, {
        foreignKey: 'customer'
      })
      Sale.belongsTo(models.User, {
        foreignKey: 'operator'
      })
      Sale.hasMany(models.Saleitem, {
        foreignKey: 'invoice'
      })
    }

    static async generateInv() {
      const result = await Sale.scope(null).findAll({
        where: { createdAt: { [Op.between]: [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)] } }
      })
      return `INV-PENJ-${moment(new Date).format('YYYYMMDD')}-${result.length + 1}`
    }
  }
  Sale.init({
    invoice: DataTypes.STRING,
    totalsum: DataTypes.DECIMAL,
    pay: DataTypes.DECIMAL,
    change: DataTypes.DECIMAL,
    customer: DataTypes.INTEGER,
    operator: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: async (sale, options) => {
        sale.invoice = await Sale.generateInv()
      }
    },
    defaultScope: {
      where: {
        deleted: false
      }
    },
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};