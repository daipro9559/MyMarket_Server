'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    itemID:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    price: {
      type:DataTypes.INTEGER
    },
    description:{
      type:DataTypes.TEXT({length:'medium'})
    },
    images:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:null
    },
    needToSale:{
      type:DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Category,{foreignKey:'categoryID'})
    this.belongsTo(models.User, {foreignKey:'userID'})
    this.belongsTo(models.Address, {foreignKey: 'addressID'})
  };
  return Item;
};