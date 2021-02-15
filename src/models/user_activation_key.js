'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class USER_ACTIVATION_KEY extends Model {
    
    static associate(models) {
      USER_ACTIVATION_KEY.belongsTo(models.Users,{foreignKey:'user_id',as:'users',onDelete: 'CASCADE'});
    }
  };
  USER_ACTIVATION_KEY.init({
    user_id: DataTypes.INTEGER,
    activation_key: DataTypes.STRING,
    expiry_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'USER_ACTIVATION_KEY',
  });
  return USER_ACTIVATION_KEY;
};