'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enterprise extends Model {
    
    static associate(models) {
      // define association here
      Enterprise.hasMany(models.Address ,{as:'address'})
    }
  };
  Enterprise.init({
    enterprise_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    enterprise_code: DataTypes.STRING,
    enterprise_type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Enterprise',
  });
  return Enterprise;
};