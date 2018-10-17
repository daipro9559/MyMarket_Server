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
    return ReS(res,categories,status.OK,"get categories success")
}
module.exports.getAllCategory = getAllCategory

const addItem = async (req,res)=>{

}
module.exports.addItem = addItem

const getItems = async (req,res)=>{
    let err,items 
    [err,items] = await to (itemService.getItems(req))
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    return ReS(res,items,status.OK)
} 
module.exports.getItems= getItems