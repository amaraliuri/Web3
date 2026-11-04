'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Cotacao', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      codigoIn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valorCompra: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: false,
      },
      valorVenda: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: false,
      },
      dataCotacao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Cotacao');
  }
};
