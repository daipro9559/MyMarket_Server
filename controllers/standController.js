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
    [err,stands] = await to(standService.getStands(req.user.userID))
    if (err){
        return ReE(res,err,status.NOT_FOUND)
    }
    return ReS(res,stands,status.OK)
}
module.exports.getStands = getStands