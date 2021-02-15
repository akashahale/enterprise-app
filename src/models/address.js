'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    
    static associate(models) {
      // define association here
      Address.belongsTo(models.Enterprise,{foreignKey:'enterprise_id',as:'enterprise'});
    }
  };
  Address.init({
    enterprise_id: DataTypes.INTEGER,
    house_name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    post_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};