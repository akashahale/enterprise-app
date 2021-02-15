'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    
    static associate(models) {
      // define association here
      Permissions.belongsToMany(models.Roles,{through:'Role_Permissions',foreignKey:'permission_id',as:'roles'});
    }
  };
  Permissions.init({
    permission_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    feature: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permissions',
  });
  return Permissions;
};