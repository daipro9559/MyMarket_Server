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
    this.belongsTo(models.Item,{foreignKey:'itemID'})
  };
  return Transaction;
};