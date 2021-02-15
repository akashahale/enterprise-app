'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role_Permissions extends Model {
    
    static associate(models) {
      Role_Permissions.hasMany(models.Roles,{foreignKey:'role_id'},{ onDelete: 'cascade' });
      Role_Permissions.hasMany(models.Permissions,{foreignKey:'permission_id'});
    }
  };
  Role_Permissions.init({
    role_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Role_Permissions',
  });
  return Role_Permissions;
};