'use strict'
const standService = require('../services/standService')
const addressService = require('../services/addressService')
const itemService = require('../services/itemService')
const notificationService  = require('../services/notificationService')
const { to, ReE, ReS } = require('../services/utilService')
const status = require('http-status')
const util = require('../helper/util')
const CONFIG = require('../config/conf')
const FCM = require('fcm-node')
const fcm = new FCM(CONFIG.serverKey)
var createStand = async(req,res)=>{
    let err, stand={},body = req.body,address={}
    address.address = body.address
    address.districtID = body.districtID
    let addressAdded
    [err,addressAdded] = await to(addressService.addAddress(address))
    if (err){
        ReE(res,err,status.NOT_IMPLEMENTED)
    }
    // if (req.files) {
    //     var files = req.files.image
    //     let  imagePathApi 
    //     let path = util.getImagePath(req.user.userID, files.name, CONFIG.image_stand_path)
    //     imagePathApi = path.substr(7, path.length)
    //     files.mv(path, (err) => {
    //         console.log(err)
    //     })
    //     stand.image = imagePathApi
    // }else{
    //     stand.image = null
    // }
    [err,stand.image] = await to(util.saveImages(req.files,item.userID,CONFIG.image_stand_path))
    stand.userID = req.user.userID
    stand.name = body.name
    stand.description = body.description
    stand.addressID = addressAdded.addressID
    stand.categoryID = body.categoryID
    let standAdded
    [err,standAdded] = await to(req.user.createStand(stand))
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    return ReS(res,standAdded,status.OK)
}
module.exports.createStand = createStand

const addItemToStand = async (req,res)=>{
    let standObject
    let err, item={},body = req.body
    // get stand detail
    if (body.standID) {
        [err,standObject] = await to(standService.getStandDetail(body.standID));
        if (err){
            return ReE(res,err,status.NOT_IMPLEMENTED)
        }
        item.addressID = body.addressID
        item.standID = body.standID
    }else{
       return ReE(res,"no standId param",status.NOT_IMPLEMENTED)
    }
    item.name = body.name;
    item.price = body.price;
    item.description = body.description;
    item.needToSell = body.needToSell;
    item.categoryID = body.categoryID;
    item.userID = req.user.userID;
    [err,item.images] = await to(util.saveImages(req.files,item.userID,CONFIG.image_item_path));
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    let itemAdded
    [err,itemAdded] = await to(req.user.createItem(item))
    if (err){
       return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    let data = {}
    data.itemID = itemAdded.itemID
    // if (standID =! null) => notification to user follow
    //send notification
    
    let users
    [err, users] = await to(standService.getAllUserFollowStand(body.standID))
    if (err) {
        console.log("khong the lay danh sach user")
    }
    
    // save notification if at least one user followed this stand
    if (users.length > 0) {
        let dataNotification = {}
        dataNotification.itemID = itemAdded.itemID
        dataNotification.body = itemAdded.name + '\n Click để xem !'
        dataNotification.standID = standObject.standID
        dataNotification.icon = standObject.image
        dataNotification.title = standObject.name + " vừa đăng một tin mới vào gian hàng của mình!"
        // save notification to database
        let notification = {}, objectData = {}
        notification.type = 2
        notification.title = standObject.name + " đã đăng một tin vào gian hàng của mình"
        notification.icon = dataNotification.icon
        objectData.itemID = dataNotification.itemID
        notification.data = JSON.stringify(objectData)
        notification.body = itemAdded.name
        notificationService.saveNotification(notification).then(notificationAdded => {
            users.forEach(user => {
                if (user.tokenFirebase) { // when user logout, no send notification
                    sendStandNotification(user.tokenFirebase, dataNotification)
                        .then(response => {
                            console.log("")
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                user.addNotification(notificationAdded)
            })

    
        }).catch(err => {

        })
    }
    
    return ReS(res,data,status.OK,"add item completed")
}
module.exports.addItemToStand = addItemToStand


var sendStandNotification = (token,data)=>{
    return new Promise((resolve, reject)=>{
        let message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: token, 
            collapse_key: CONFIG.collapse_key,
            
            notification: {
                icon:data.icon,
                title: data.title,
                body: data.body
            },  
            data: {  //you can send only notification or only data(or include both)
                standID: data.standID,
                itemID: data.itemID
            }
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

var getMyStands = async (req,res)=>{
    let err,stands
    [err,stands] = await to(standService.getMyStands(req.user.userID))
    if (err){
        return ReE(res,err,status.NOT_FOUND)
    }
    return ReS(res,stands,status.OK)
}
module.exports.getMyStands = getMyStands

var getStands = async (req,res)=>{
    let err,stands
    [err,stands] = await to(standService.getStands(req.user.userID,req.query))
    if (err){
        return ReE(res,err,status.NOT_FOUND)
    }
    let usersStandsFollowed
    [err,usersStandsFollowed] = await to(standService.getUserStandFollowed(req.user))
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }

    usersStandsFollowed.forEach(userStandFollow => {
        stands.forEach(stand=>{
            if (stand.standID == userStandFollow.standID){
                stand.isFollowed = true
            }
        })
    })
    return ReS(res,stands,status.OK,util.checkLastPage(stands.length))
}
module.exports.getStands = getStands

const followStand = async (req,res)=>{
    let err,userStand
    if (!req.body.standID){
        return ReE(res," not select item",status.NOT_IMPLEMENTED)
    }
   [err,userStand] = await to (standService.followStand(req.user.userID,req.body.standID))
   if (err){
    return ReE(res,err,status.NOT_IMPLEMENTED)
   }
   return ReS(res,userStand,status.OK)
}
module.exports.followStand = followStand

var unFollow = async (req,res)=>{
    let err, result
    [err,result] = await to(standService.unFollowStand(req.user.userID,req.params.standID))
    if (err){
        return ReE(res,err,status.NOT_FOUND)
    }
    return ReS(res,null,status.OK,"unmarked completed")
}
module.exports.unFollow = unFollow


const deleteStand = async(req,res)=>{
    let err,result
    [err,result] = await to(standService.deleteStand(req.params.standID))
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    return ReS(res,null,status.OK,"Delete stand completed")
}
module.exports.deleteStand = deleteStand