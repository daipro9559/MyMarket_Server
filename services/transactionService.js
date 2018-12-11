'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Address,sequelize,User,Sequelize,Transaction,Item} = require('../models')
const Op = Sequelize.Op
const createTransaction = async(sellerId,dataJson)=>{
    var err,transactionAdded,transaction={},dataObject;
    dataObject = JSON.parse(dataJson);
    transaction.sellerID = sellerId;
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

const getTransaction = async(userId,query)=>{
    var err, transactions;
    var page = query.page;
    if (!page){
        page = 0
    }
    if (query.addToStand == true) {
        [err, transactions] = await to(Transaction.findAll({
            where: {
                 buyerID: userId
            },
            include: [{
                model: Item,
                where: {
                    needToSell:true
                }
            }],
            order: [['createdAt', 'DESC']],
            offset: page * CONFIG.page_size_item,
            limit: CONFIG.page_size_item
        }))
    } else {
        [err, transactions] = await to(Transaction.findAll({
            where: {
                [Op.or]: [{ sellerID: userId }, { buyerID: userId }]
            },
            include: [{
                model: Item,
            }],
            order: [['createdAt', 'DESC']],
            offset: page * CONFIG.page_size_item,
            limit: CONFIG.page_size_item
        }))
    }
    if(err){
        TE(err.message)
    }
    return transactions
}
module.exports.getTransaction = getTransaction
