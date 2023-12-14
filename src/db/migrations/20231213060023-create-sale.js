'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      totalsum: {
        type: Sequelize.DECIMAL(19,2)
      },
      pay: {
        type: Sequelize.DECIMAL(19,2)
      },
      change: {
        type: Sequelize.DECIMAL(19,2)
      },
      customer: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Customers',
          key: 'id'
        },
        onDelete: 'RESTRICT'
      },
      operator: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'RESTRICT'
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Sales');
  }
};