'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Category,Item,Address} = require('../models')
const multer = require('multer')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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
    let whereItem={},whereAddress={}
    whereItem.userID={
        [Op.ne]: userID
    }
    if (queries.categoryID){
        whereItem.categoryID = queries.categoryID
    }
    if (queries.name){
        let queryName = "%"+queries.name+"%"
        whereItem.name={
            [Op.like]: queryName
        }
    }
    if (queries.priceMin && queries.priceMax){
        whereItem.price = {
            [Op.gte]: queries.priceMin,
            [Op.lte]: queries.priceMax   
        }
    }else if (queries.priceMax){
        whereItem.price = {
            [Op.lte]: queries.priceMax   
        }
    }else if (queries.priceMin){
        whereItem.price = {
            [Op.gte]: queries.priceMin,
        }
    }
    if (queries.needToSell){
        whereItem.needToSell = queries.needToSell
    }
    let err, items
    [err, items] = await to(Item.findAll(
        {
            where: whereItem
            // where:{
            // categoryID : queries.categoryID,
            // userID :{
            //     [Op.ne]: userID
            // }
            // }
            ,
            include: [
                { 
                    model: Address 
                }
            ]
        }))
    if (err) {
        TE(err)
    }
    return items
}
module.exports.getItems = getItems