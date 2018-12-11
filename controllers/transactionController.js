'use strict'
const transactionService = require('../services/transactionService')
const notificationService = require('../services/notificationService')
const { to, ReE, ReS } = require('../services/utilService')
const status = require('http-status')
const util = require('../helper/util')
const CONFIG = require('../config/conf')

const confirmTransaction = async (req,res)=>{
    let err, notification = req.body,transactionAdded
    [err,transactionAdded] = await to (transactionService.createTransaction(req.user.userID,notification.data))
    if (err){
        return  ReE(res,err,status.NOT_IMPLEMENTED)
    }
    // delete notification
    let deleteNotificationResult 
    [err,deleteNotificationResult] = await to(notificationService.deleteNotification(req.user.userID,notification.notificationID))
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    return ReS(res,null,status.OK,"Xác nhận yêu cầu giao dịch thành công")
}
module.exports.confirmTransaction = confirmTransaction

const getTransaction = async (req,res)=>{
    let err, transactions
    [err,transactions] = await to(transactionService.getTransaction(req.user.userID,req.query))
    if (err){
        return ReE(res,err,status.NOT_FOUND)
    }
    return ReS(res,transactions,status.OK,"",util.checkLastPage(transactions.length))
}
module.exports.getTransaction = getTransaction