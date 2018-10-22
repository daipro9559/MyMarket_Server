'use strict'
const itemService = require('../services/itemService')
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
    let err, item
    return ReS(res,req.user,status.OK,"upload completed")
}
module.exports.addItem = addItem

const getItems =async (req,res)=>{
    let categoryID = req.categoryID
    if (!categoryID){
        return ReE(res,"fail to execute action",status.UNPROCESSABLE_ENTITY)
    }
    
}
module.exports.getItems = getItems