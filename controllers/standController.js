'use strict'
const standService = require('../services/standService')
const addressService = require('../services/addressService')
const { to, ReE, ReS } = require('../services/utilService')
const status = require('http-status')
const util = require('../helper/util')
const CONFIG = require('../config/conf')
var createStand = async(req,res)=>{
    let err, stand={},body = req.body,address={}
    address.address = body.address
    address.districtID = body.districtID
    let addressAdded
    [err,addressAdded] = await to(addressService.addAddress(address))
    if (err){
        ReE(res,err,status.NOT_IMPLEMENTED)
    }
    if (req.files) {
        var files = req.files.image
        let  imagePathApi 
        let path = util.getImagePath(req.user.userID, files.name, CONFIG.image_stand_path)
        imagePathApi = path.substr(7, path.length)
        files.mv(path, (err) => {
            console.log(err)
        })
        stand.image = imagePathApi
    }else{
        stand.image = null
    }
    stand.userID = req.user.userID
    stand.name = body.name
    stand.description = body.description
    stand.addressID = addressAdded.addressID
    stand.categoryID = body.categoryID
    let standAdded
    [err,standAdded] = await to(standService.createStand(stand))
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    return ReS(res,standAdded,status.OK)
}
module.exports.createStand = createStand

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
    return ReS(res,stands,status.OK)
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