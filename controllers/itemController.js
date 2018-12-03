'use strict'
const itemService = require('../services/itemService')
const addressService = require('../services/addressService')
const standService = require('../services/standService')
const { to, ReE, ReS } = require('../services/utilService')
const status = require('http-status')
const util = require('../helper/util')
const CONFIG = require('../config/conf')
var FCM = require('fcm-node');
var fcm = new FCM(CONFIG.serverKey);
const getAllCategory = async (req,res)=>{
    let err, categories;
    [err,categories] = await to(itemService.getCategories())
    if (err){
        return ReE(res,err,status.NOT_ACCEPTABLE)
    }
    return ReS(res,categories,status.OK)
}
module.exports.getAllCategory = getAllCategory

const addItem = async (req,res)=>{
    let err, item={},address={},body = req.body
    if (body.standID) {
        item.addressID = body.addressID
        item.standID = body.standID
    } else {
        address.address = body.address
        address.districtID = body.districtID
        let addressAdded
        [err, addressAdded] = await to(addressService.addAddress(address));
        if (err) {
            ReE(res, err, status.NOT_IMPLEMENTED)
        }
        item.addressID = addressAdded.addressID
    }
    item.name = body.name
    item.price = body.price
    item.description = body.description
    item.needToSell = body.needToSell
    item.categoryID = body.categoryID
    item.userID = req.user.userID
    let itemAdded
    // if (req.files) {
    //     var files = req.files.images
    //     var imagePath = [], imagePathApi = []
    //     if (Array.isArray(files)) {
    //         for (var i = 0; i < files.length; i++) {
    //             var path = util.getImagePath(item.userID, files[i].name,CONFIG.image_item_path)
    //             imagePath.push(path)
    //             imagePathApi.push(path.substr(7, path.length))
    //             files[i].mv(path, (err) => {
    //                 console.log(err)
    //             })
    //         }
    //     } else {
    //         var path = util.getImagePath(item.userID, files.name,CONFIG.image_item_path)
    //         imagePath.push(path)
    //         imagePathApi.push(path.substr(7, path.length))
    //         files.mv(path, (err) => {
    //             console.log(err)
    //         })
    //     }
    //     item.images = JSON.stringify(imagePathApi);//convert array image path to json
    // }else{
    //     item.images = JSON.stringify([])
    // }
    [err,item.images] = await to(util.saveImages(req.files,item.userID,CONFIG.image_item_path));
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    [err,itemAdded] = await to(req.user.createItem(item))
    if (err){
       return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    let data = {}
    data.itemID = itemAdded.itemID
    return ReS(res,data,status.OK,"add item completed")
}
module.exports.addItem = addItem

const getItems =async (req,res)=>{
    let categoryID = req.query.categoryID
    // if (!categoryID){
    //     return ReE(res,"fail to execute action",status.UNPROCESSABLE_ENTITY)
    // }
    let err,items
    [err,items] = await to(itemService.getItems(req.user.userID,req.query))
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    //check 
    let userItemsMarked
    [err,userItemsMarked] = await to(itemService.getUserItemMarked(req.user))
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }

    userItemsMarked.forEach(userItemMarked => {
        items.forEach(item=>{
            if (item.itemID == userItemMarked.itemID){
                item.isMarked = true
            }
        })
    })
    return ReS(res,items,status.OK,"get items completed",util.checkLastPage(items.length))
}
module.exports.getItems = getItems

const getItemDetail = async(req,res)=>{
    let err,item
    [err,item] = await to(itemService.getItemDetail(req.params.itemID))
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    return ReS(res,item,status.OK)
}
module.exports.getItemDetail = getItemDetail

// marked item 
var markItem = async (req,res)=>{
    let err,userItem
    if (!req.body.itemID){
        return ReE(res," not select item",status.NOT_IMPLEMENTED)
    }
   [err,userItem] = await to (itemService.markItem(req.user.userID,req.body.itemID))
   if (err){
    return ReE(res,err,status.NOT_IMPLEMENTED)
   }
   
   return ReS(res,userItem,status.OK)
}
module.exports.markItem = markItem

var getMarkedItems = async(req,res)=>{
    let err,items 
    [err,items] = await to(itemService.getItemsMarked(req.user))
    if(err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    items.forEach(item=>{
        item.isMarked = true
    })
    return ReS(res,items,status.OK)
}
module.exports.getMarkedItems = getMarkedItems

var unMarkItem = async (req,res)=>{
    let err, result
    [err,result] = await to(itemService.unMarkItem(req.user.userID,req.params.itemID))
    if (err){
        return ReE(res,err,status.NOT_FOUND)
    }
    return ReS(res,null,status.OK,"unmarked completed")
}
module.exports.unMarkItem = unMarkItem

var deleteItem = async (req,res)=>{
    let err,result
    [err,result] =await to(itemService.deleteItem(req.params.itemID))
    if (err){ return ReE(res,err,status.NOT_FOUND)}
    return ReS(res,null,status.OK,"Deleted item successfully")
}
module.exports.deleteItem = deleteItem


var requestBuy = async(req,res)=>{

}
module.exports.requestBuy = requestBuy