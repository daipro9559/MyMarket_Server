'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    itemID:{
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      unique:true
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    price: {
      type:DataTypes.BIGINT(11)
    },
    description:{
      type:DataTypes.TEXT({length:'medium'})
    },
    images:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:null
    },
    needToSell:{
      type:DataTypes.BOOLEAN,
      defaultValue: true
    },
    isDone:{
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    isMarked: { // no have column this table, it will use check for item is marked
      type: DataTypes.VIRTUAL,
      defaultValue:false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Category,{foreignKey:'categoryID'})
    this.belongsTo(models.User, {foreignKey:'userID'})
    this.belongsTo(models.Address, {foreignKey: 'addressID'})
    this.belongsTo(models.Stand,{foreignKey:'standID'})
    this.hasMany(models.UserItemMarked,{foreignKey: 'itemID'})

    // this.belongsToMany(models.User,{through:'UserItemMarked'})
  };
  return Item;
};