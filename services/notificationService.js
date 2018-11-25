'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Category,Item,District,sequelize,User,Notification,UserNotification} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const fs = require('fs');
const util = require('../helper/util')

var getNotifications = async (userId,page)=>{
    let err,notifications
    [err,notifications] = await to(User.findAll({
      where:{
        userID:userId
      },
      include: [{
        model: Notification,
        through:{
          
        }
        // order: [ ['updatedAt', 'DESC']],
        // offset: page * CONFIG.page_size_item,
        // limit: CONFIG.page_size_item
      }]
    }))
    if (err){
      TE(err)
    }
      return notifications
}
module.exports.getNotifications = getNotifications


var saveNotification = async (notifyObject)=>{
    let err,notification
    [err,notification] = await to(Notification.create(notifyObject))
    if (err){
        TE(err)
    }
    return notification
}
module.exports.saveNotification = saveNotification

var saveUserNotification  = async (userNotification)=>{
  let err,notification
  [err,notification] = await to(UserNotification.create(userNotification))
  if (err){
      TE(err)
  }
  return notification
}
module.exports.saveUserNotification = saveUserNotification

const deleteNotification = async (userId,notificationId)=>{
  let err, result
  [err,result] = await to(UserNotification.destroy({
    where:{
      userID : userId,
      notificationID : notificationId
    }
  }))
  if (err){
    TE(err)
  }
  // check if no have user have this notification => delete notification
  UserNotification.findAndCountAll({
    where:{
      notificationID : notificationId
    }
  }).then((result) => {
    if (result.count == 0){
      Notification.destroy({
        where:{
          notificationID:notificationId
        }
      }).then(result=>{

      }).catch(err=>{

      })
    }
  }).catch((err) => {
    
  })
  return result
}
module.exports.deleteNotification = deleteNotification