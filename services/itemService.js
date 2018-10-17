'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Category,Item,Address} = require('../models')

const getCategories = async()=>{
    let err,categories
    [err,categories] = await to(Category.findAll())
    if (err){
        TE(err)
    }
    return categories
}
module.exports.getCategories = getCategories

const createItem = async (params)=>{
    
}
module.exports.createItem = createItem

const getItems = async(req)=>{
    let err,items
    let whereItem={}
    if (req.query.categoryID){
        whereItem.categoryID = parseInt(req.query.categoryID)
    }
    [err,items] = await to (Item.findAll({where:whereItem,
        include: [Address]}))
    if (err){
        TE(err)
    }
    return items
}
module.exports.getItems = getItems