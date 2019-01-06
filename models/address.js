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
    location: {
       type: DataTypes.GEOMETRY('POINT'),
       allowNull: true
    },
    // distance: { // no have column this table, it will use check for item is marked
    //   type: DataTypes.VIRTUAL,
    //   defaultValue:0
    // },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.District, {foreignKey: 'districtID'})
  };
  return Address;
};