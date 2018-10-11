'use strict';
module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define('Province', {
    provinceID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    provinceName: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {});
  Province.associate = function(models) {

    // associations can be defined here
  };
  return Province;
};