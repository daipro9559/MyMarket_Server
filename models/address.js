'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    addressID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.BIGINT                      
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
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.District, {foreignKey: 'districtID'})
  };
  return Address;
};