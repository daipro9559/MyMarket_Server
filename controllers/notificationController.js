'use strict'
const itemService = require('../services/itemService')
const notificationService = require('../services/notificationService')
const { to, ReE, ReS } = require('../services/utilService')
const status = require('http-status')
const util = require('../helper/util')
const CONFIG = require('../config/conf')

const getNotifications = async (req,res)=>{
    let err,notifications
    [err,notifications] = await to (req.user.getNotifications())
    if (err){
        return ReE(res,err,status.NOT_FOUND)
    }
    return ReS(res,notifications,status.OK,util.checkLastPage(notifications.length))
}
module.exports.getNotifications = getNotifications

// delete notification


const deleteNotification = async (req,res)=>{
    let err, result
    [err,result] = await to(notificationService.deleteNotification(req.user.userID,req.params.notificationID))
    if (err){
        return ReE(res,err,status.NOT_MODIFIED)
    }
    return ReS(res,result,status.OK)
}
module.exports.deleteNotification = deleteNotification