'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    addressID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
      },
    address: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.District,{foreignKey: 'districtID'})
  };
  return Address;
};