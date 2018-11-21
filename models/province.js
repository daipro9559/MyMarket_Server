'use strict';
module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define('Province', {
    provinceID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    provinceName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Province.associate = function(models) {
    this.hasMany(models.District,{foreignKey: 'provinceID'})
    // associations can be defined here
  };
  return Province;
};