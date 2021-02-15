'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Role_Permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete:'CASCADE',
        references:{
          model:'Roles',
          key:'role_id'
        }
      },
      permission_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Permissions',
          key:'permission_id'
        }
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
    await queryInterface.dropTable('Role_Permissions');
  }
};