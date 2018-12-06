'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Address,sequelize,User,Sequelize,Transaction} = require('../models')

const createTransaction = async(sellerID,dataJson)=>{
    var err,transactionAdded,transaction={},dataObject;
    dataObject = JSON.parse(dataJson);
    transaction.sellerID = sellerID;
    transaction.buyerID = dataObject.userID;
    transaction.price = dataObject.price;
    transaction.itemID = dataObject.itemID;
    [err,transactionAdded] = await to(Transaction.create(transaction));
    if (err){
        TE(err.message)
    }
    return transactionAdded
}
module.exports.createTransaction = createTransaction
