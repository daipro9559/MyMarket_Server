'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    addressID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER
      },
    address: {
      type:DataTypes.STRING,
      allowNull:false
    },
    latitude:{
      type:DataTypes.DOUBLE,
      allowNull:true
    },
    longitude:{
      type:DataTypes.DOUBLE,
      allowNull:true
    }
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.District, {foreignKey: 'districtID'})
  };
  return Address;
};