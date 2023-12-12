'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Purchaseitems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Purchases',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      itemcode: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Goods',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      purchaseprice: {
        type: Sequelize.DECIMAL(19,2)
      },
      totalprice: {
        type: Sequelize.DECIMAL(19,2)
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
    await queryInterface.dropTable('Purchaseitems');
  }
};