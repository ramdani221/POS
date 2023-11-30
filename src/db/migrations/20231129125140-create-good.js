'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Goods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      barcode: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(150)
      },
      stock: {
        type: Sequelize.INTEGER
      },
      purchaseprice: {
        type: Sequelize.DECIMAL(19,2)
      },
      sellingprice: {
        type: Sequelize.DECIMAL(19,2)
      },
      unit: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Units',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'SET NULL'
      },
      picture: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Goods');
  }
};