'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Category,Province,Item,District,sequelize,User,Notification,UserNotification,ConditionNotify} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const fs = require('fs');
const util = require('../helper/util')

var getNotifications = async (userId,page)=>{
    let err,notifications
    [err,notifications] = await to(Notification.findAll({
      include: [{
        model: User,
        through:{
          where:{
            userID:userId
          },
          attributes:[]
        }
      }],
      order: [['updatedAt', 'DESC']],
      offset: page * CONFIG.page_size_item,
      limit: CONFIG.page_size_item
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
        TE(err.message)
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


var getConditionNotify = async (userId)=>{
  let err, result
  [err,result] = await to(ConditionNotify.findOrCreate({
    where:{
      userID : userId
    }
  }))
  if (err){
    TE(err)
  }
  let condition
  [err,condition] = await to(ConditionNotify.findOne({
    where:{
      conditionID : result[0].conditionID
    }
    ,
    include:[
      {
        model:Category
      },
      {
        model:District
      },
      {
        model:Province
      }
    ]
  }))
  return condition
}
module.exports.getConditionNotify = getConditionNotify

var saveSettingCondition = async(conditionObject)=>{
  let err,result
  [err, result] = await to(ConditionNotify.update(
    {
      categoryID: conditionObject.categoryID,
      districtID: conditionObject.districtID,
      provinceID: conditionObject.provinceID,
      isEnable:conditionObject.isEnable
    },
    { where: { conditionID: conditionObject.conditionID } }
  ))
  if (err){
    TE(err)
  }
  return result
}
module.exports.saveSettingCondition = saveSettingCondition

const requestBuyItem = async (itemId,sellerId)=>{
  
}
module.exports.requestBuyItem = requestBuyItem