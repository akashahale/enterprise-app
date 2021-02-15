'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Password_Policies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      policy_name: {
        type: Sequelize.STRING
      },
      enterprise_code: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
    minPasswordLength:Sequelize.INTEGER,
    minLowerAlphaChars:Sequelize.INTEGER,
    minUpperAlphaChars:Sequelize.INTEGER,
    minNumericalChars:Sequelize.INTEGER,
    minSpecialChars:Sequelize.INTEGER,
    passwordHistoryLength:Sequelize.INTEGER,
    specialChars:Sequelize.INTEGER,
    passwordAge:Sequelize.INTEGER,
      status: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Password_Policies');
  }
};