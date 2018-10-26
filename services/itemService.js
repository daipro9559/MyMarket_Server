'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Category,Item,Address} = require('../models')
const multer = require('multer')

const getCategories = async()=>{
    let err,categories
    [err,categories] = await to(Category.findAll())
    if (err){
        TE(err)
    }
    return categories
}
module.exports.getCategories = getCategories

const addItem = async (item)=>{
    let err, itemAdded
    [err,itemAdded] = await to (Item.create(item))
    if (err){
        TE(err)
    }
    return itemAdded
}
module.exports.addItem = addItem

const getItems = async (userID,queries)=>{
    if (queries.categoryID ==0){
    }
    let err, items
    [err,items] = await to(Item.findAll(
        { 
        where:{
            categoryID : queries.categoryID,
            userID :{
                [Op.ne]: userID
            }
        },
        include: [
        { model: Address}
     ]}))
    if (err){
        TE(err)
    }
    return items
}
module.exports.getItems = getItems