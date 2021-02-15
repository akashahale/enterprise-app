'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    
    static associate(models) {
     Users.belongsToMany(models.Roles,{through:'UserRoles',foreignKey:'userId',as:'roles'},{onDelete:'cascade'});
     Users.hasMany(models.USER_ACTIVATION_KEY ,{as:'user_activation_key'})
    }
  };
  Users.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    emailId: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    enterprise_code: DataTypes.STRING,
    status: {
      type: DataTypes.STRING
    },
    user_type:{
      type: DataTypes.INTEGER
    },
    password_created: {
      type: DataTypes.DATE
    },
    password_expiry: {
      type: DataTypes.DATE
    },
    last_login_date: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};