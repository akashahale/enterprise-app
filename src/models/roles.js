'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    
    static associate(models) {
      Roles.belongsToMany(models.Users,{through:"UserRoles",foreignKey:'role_id',as:'users'});
      Roles.belongsToMany(models.Permissions,{through:"Role_Permissions",foreignKey:'role_id',as:'permissions',onDelete: 'CASCADE',});
    }
  };
  Roles.init({
    role_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    enterprise_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};