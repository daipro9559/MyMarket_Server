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
    this.hasMany(models.Address)
    this.belongsTo(models.Province)
    // associations can be defined here
  };
  return District;
};