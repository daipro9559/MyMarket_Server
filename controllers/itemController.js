'use strict'
const itemService = require('../services/itemService')
const addressService = require('../services/addressService')
const { to, ReE, ReS } = require('../services/utilService')
const status = require('http-status')

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
    address.address = body.address
    address.districtID = body.districtID
    let addressAdded
    [err,addressAdded] = await to(addressService.addAddress(address))
    if (err){
        ReE(res,err,status.NOT_IMPLEMENTED)
    }
    item.name = body.name
    item.price = body.price
    item.description = body.description
    item.description = body.needToSale
    item.categoryID = body.categoryID
    item.addressID = addressAdded.addressID
    item.userID = req.user.userID
    [err,itemAdded] = await to(itemService.addItem(item))
    if (err){
        ReE(res,err,status.NOT_IMPLEMENTED)
    }
    return ReS(res,itemAdded,status.OK,"add item completed")
}
module.exports.addItem = addItem

const getItems =async (req,res)=>{
    let categoryID = req.categoryID
    if (!categoryID){
        return ReE(res,"fail to execute action",status.UNPROCESSABLE_ENTITY)
    }
    let err,items
    [err,items] = await to(itemService.getItems(categoryID))
}
module.exports.getItems = getItems