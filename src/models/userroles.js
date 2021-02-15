'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    
    static associate(models) {
      // define association here
      UserRoles.belongsTo(models.Users,{foreignKey:'userId'},{onDelete:'cascade'});
      UserRoles.belongsTo(models.Roles,{foreignKey:'role_id'},{onDelete:'cascade'});
    }
  };
  UserRoles.init({
    userId: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserRoles',
  });
  return UserRoles;
};