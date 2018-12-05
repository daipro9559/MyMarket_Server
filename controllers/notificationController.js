'use strict'
const itemService = require('../services/itemService')
const userService = require('../services/userService')
const notificationService = require('../services/notificationService')
const { to, ReE, ReS } = require('../services/utilService')
const status = require('http-status')
const util = require('../helper/util')
const CONFIG = require('../config/conf')
const FCM = require('fcm-node')
const fcm = new FCM(CONFIG.serverKey)
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

var getConditionNotify = async (req,res)=>{
    let err, result
    [err,result] = await to(notificationService.getConditionNotify(req.user.userID))
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    return ReS(res,result,status.OK)
}
module.exports.getConditionNotify = getConditionNotify

var saveSettingCondition = async (req,res)=>{
    let err, result,objectCondition={}
    objectCondition.conditionID = req.params.conditionID;
    objectCondition.provinceID = req.body.provinceID;
    objectCondition.categoryID = req.body.categoryID;
    objectCondition.districtID = req.body.districtID;
    objectCondition.isEnable = req.body.isEnable;
    [err, result] = await to(notificationService.saveSettingCondition(objectCondition))
    if (err) {
        return ReE(res, err, status.NOT_FOUND)
    }
    return ReS(res, null, status.OK)
}
module.exports.saveSettingCondition = saveSettingCondition

// create notification to seller :  data has userId of user need buy item, itemID
const requestByItem = async(req,res)=>{
    let err, notifications={},itemName,price,notification={},data={}
    itemName = req.body.itemName
    price = req.body.price
    notification.title = req.user.name +" muốn xác nhận đã giao dịch với bạn!"
    notification.icon = req.user.avatar
    notification.body = "Mặt hàng : " +itemName +"\n Giá: "+ price
    data.itemID=req.body.itemID;
    data.userID = req.user.userID;// id of user request confirm
    notifications.notification = notification;
    notifications.data = data;
    // get seller
    let seller
    [err,seller] = await to(userService.getProfile(req.body.sellerID));
    if (err){
        return ReE(res,err,status.NOT_FOUND)
    }
    if (seller.tokenFirebase){
       let message = 'Gửi yêu cầu thành công!',response
       [err,response] = await to(sendNotificationRequestConfirm(seller.tokenFirebase,notifications))
       if (err){
           return ReE(res,err,status.NOT_IMPLEMENTED)
       }       
       // save notification 
       notification.data = JSON.stringify(data)
       notification.type = 3
       let notificationSaved 
       [err,notificationSaved] = await to (notificationService.saveNotification(notification))
       if (err){
           return ReE(res,err,status.NOT_IMPLEMENTED)
       }
       seller.addNotification(notificationSaved).then(result=>{

       }).catch(err=>{
           console.log(err.message)
       })
       return ReS(res,null,status.OK,message)
    }else{
        let message = 'Người dùng tạm thời đã đăng xuất ra khỏi hệ thống, hãy liên lạc qua số điện thoại ngay '
        return ReE(res,message,status.NOT_IMPLEMENTED,)
    }
}



  function sendNotificationRequestConfirm(token,notifications){
    return new Promise((resolve, reject)=>{
        let message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: token, 
            collapse_key: CONFIG.collapse_key,
            
            notification: notifications.notification,  
            data: notifications.data
        }   
        fcm.send(message, function(err, response){
            if (err) {
                reject(err.message)
            } else {
               resolve (response)
            }
        });
    })
 } 

module.exports.requestByItem = requestByItem