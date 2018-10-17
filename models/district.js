'use strict';
module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define('District', {
    districtID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    districtName: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {});
  District.associate = function(models) {
    this.hasMany(models.Address,{foreignKey: 'districtID'})
    this.belongsTo(models.Province,{foreignKey: 'provinceID'})
    // associations can be defined here
  };
  return District;
};