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
    let err, item={},address={}
    item.name = req.body.name
    item.price = req.body.price
    item.descripton = req.body.descripton
    item.categoryID = req.body.categoryID
    item.userID = req.user.userID
    address.address = req.body.address
    address.districtID = req.body.districtID
    [err,addressAdded] = await to(addressService.addAddress(address))
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    item.addressID = addressAdded.addressID
    let itemAdded 
    [err,itemAdded] = await to(itemService.addItem(item))
    if (err){
        ReE(res,err,status.NOT_IMPLEMENTED)
    }
    return ReS(res,itemAdded,status.OK,"add item completed")
}
module.exports.addItem = addItem

const getItems =async (req,res)=>{
    let categoryID = req.query.categoryID
    if (!categoryID){
        return ReE(res,"fail to execute action",status.UNPROCESSABLE_ENTITY)
    }
    
}
module.exports.getItems = getItems