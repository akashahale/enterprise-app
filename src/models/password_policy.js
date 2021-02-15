'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Password_Policy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Password_Policy.init({
    policy_name: DataTypes.STRING,
    enterprise_code: DataTypes.STRING,
    description: DataTypes.STRING,
    minPasswordLength:DataTypes.INTEGER,
    minLowerAlphaChars:DataTypes.INTEGER,
    minUpperAlphaChars:DataTypes.INTEGER,
    minNumericalChars:DataTypes.INTEGER,
    minSpecialChars:DataTypes.INTEGER,
    passwordHistoryLength:DataTypes.INTEGER,
    specialChars:DataTypes.INTEGER,
    passwordAge:DataTypes.INTEGER,
    status: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Password_Policy',
  });
  return Password_Policy;
};