'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Category,Item,Address,District,UserItemMarked,sequelize,User} = require('../models')
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

const getItems = async (userId,queries)=>{
    let whereItem={},whereAddress={},whereDistrict={},myOrder=[]
    whereItem.userID={
        [Op.ne]: userId
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
    if(queries)
    if (queries.isFree){
        whereItem.price = 0
    } else {
        if (queries.priceMin && queries.priceMax) {
            whereItem.price = {
                [Op.gte]: queries.priceMin,
                [Op.lte]: queries.priceMax
            }
        } else if (queries.priceMax) {
            whereItem.price = {
                [Op.lte]: queries.priceMax
            }
        } else if (queries.priceMin) {
            whereItem.price = {
                [Op.gte]: queries.priceMin,
            }
        }
        if (queries.priceDown){
            myOrder.push(['price','DESC'])
        }else if (queries.priceUp){
            myOrder.push( ['price', 'ASC'])
        }
    }
    if (queries.needToSell){
        whereItem.needToSell = queries.needToSell
    }
    if (queries.districtID){
        whereAddress.districtID = queries.districtID
    }else if (queries.provinceID){
        whereDistrict.provinceID = queries.provinceID
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
                    model: Address,
                    where: whereAddress,
                    include: [
                        {
                            model: District,
                            where: whereDistrict,
                            attributes:[]
                        },
                        // {
                        //     model:UserItemMarked,
                        //     where:{
                        //         userID:userID,
                        //         ite
                        //     }
                        // }
                    ]
                }
            ],
            order:myOrder
        }))
    if (err) {
        TE(err)
    }
    return items
}
module.exports.getItems = getItems

// operate mark item 
var markItem = async (userId,itemId)=>{
    let err,userItem
    [err,userItem] = await to (UserItemMarked.create({userID:userId,itemID:itemId}))
    if(err){
        TE(err)
    }else{
        return userItem
    }
}
module.exports.markItem = markItem

var getItemsMarked = async (user)=>{
    let err,userItemsMarked
    [err,userItemsMarked] = await to(UserItemMarked.findAll({where:{userID:user.userID}}))
    if (err){
        TE(err)
    }
    let items,ids=[]
    userItemsMarked.forEach(element => {
        ids.push(element.itemID)
    });
    [err,items] = await to(Item.findAll({
        where:{itemID:ids},
        include:[
            {model:Address}
        ]
    }))
    if (err){ TE(err)}
    return items
}
module.exports.getItemsMarked = getItemsMarked
var unMarkItem = async (userId,itemId)=>{
    let err, userItemMarked
    [err, userItemMarked] = await to(UserItemMarked.destroy({
        where: {
            userID: userId,
            itemID: itemId
        }
    }))
    if (err){
        TE(err)
    }
    return true
}
module.exports.unMarkItem = unMarkItem