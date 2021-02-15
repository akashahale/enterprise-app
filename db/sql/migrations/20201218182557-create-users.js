'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      emailId: {
        type: Sequelize.STRING
      },
      password:{
        type: Sequelize.STRING
      },
      salt:{
        type: Sequelize.STRING
      },
      enterprise_code: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      user_type:{
        type: Sequelize.INTEGER
      },
      password_created: {
        type: Sequelize.DATE
      },
      password_expiry: {
        type: Sequelize.DATE
      },
      last_login_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Users');
  }
};