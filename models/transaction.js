'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    transactionID: {
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },
    price: DataTypes.BIGINT(11),
    itemID:{
        type: DataTypes.UUID,
        allowNull: false
    },
    sellerID :{
        type: DataTypes.UUID,
        allowNull: false
    },
    buyerID:{
        type: DataTypes.UUID,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    this.hasOne(models.Item,{foreignKey:'itemID'})
  };
  return Transaction;
};