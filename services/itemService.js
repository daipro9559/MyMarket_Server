'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Category,Item} = require('../models')
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

const createItem = async (item)=>{
    
}
module.exports.createItem = createItem

const getItems = async (queries)=>{
    
}
module.exports.getItems = getItems