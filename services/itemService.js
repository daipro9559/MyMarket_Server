'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Category,Item,Address,District,Province,UserItemMarked,sequelize,User,ConditionNotify} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const util = require('../helper/util')

const getCategories = async()=>{
    let err,categories
    [err,categories] = await to(Category.findAll())
    if (err){
        TE(err)
    }
    return categories
}
module.exports.getCategories = getCategories

const addItem = async (item) => {
    let err, itemAdded
    [err, itemAdded] = await to(Item.create(item))
    if (err) {
        TE(err)
    }
    return itemAdded
}
module.exports.addItem = addItem

const getItems = async (userId, queries) => {
    let whereItem = {}, whereAddress = {}, whereDistrict = {}, myOrder = [], page
    if (queries.isMyItems) {
        whereItem.userID = userId
    } else {
        whereItem.userID = {
            [Op.ne]: userId
        }
    }
    if (queries.categoryID) {
        whereItem.categoryID = queries.categoryID
    }
    if (queries.name) {
        let queryName = "%" + queries.name + "%"
        whereItem.name = {
            [Op.like]: queryName
        }
    }
    if (queries.isNewest != undefined && queries.isNewest == true) {
        myOrder.push(['updatedAt', 'DESC'])
    }
    if (queries.isFree) {
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
        if (queries.priceDown) {
            myOrder.push(['price', 'DESC'])
        } else if (queries.priceUp) {
            myOrder.push(['price', 'ASC'])
        }
    }
   
    if (queries.needToSell != undefined) {
        whereItem.needToSell = queries.needToSell
    }
    if (queries.districtID) {
        whereAddress.districtID = queries.districtID
    } else if (queries.provinceID) {
        whereDistrict.provinceID = queries.provinceID
    }

    if (!queries.page) {
        TE("not has param page")
    } else {
        page = parseInt(queries.page)
    }
    if (queries.standID) {
        whereItem.standID = queries.standID
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
            order:myOrder,
            offset: page*CONFIG.page_size_item, 
            limit: CONFIG.page_size_item
        }))
    if (err) {
        TE(err)
    }
    return items
}
module.exports.getItems = getItems

const getItemDetail = async(userId,itemId)=>{
    let err,item 
    [err,item] = await to(Item.findOne({
        where:{
            itemID:itemId
        },
        include: [
            {
                model: Address,
                include: [{
                    model: District,
                    include:[{
                        model: Province,
                    }]
                }]
            },
            {
                model: Category
            }
        ]
    }))
    if (err){
        TE(err)
    }
    // check if item is marked
    let itemMarked
    [err,itemMarked] = await to(UserItemMarked.findOne({
        where:{
            itemID: item.itemID,
            userID:userId
        }
    }))
    if (!err && itemMarked){
        item.isMarked = true
    }
    return item
}
module.exports.getItemDetail = getItemDetail

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

var getUserItemMarked = async (user)=>{
    let err,userItemsMarked
    [err,userItemsMarked] = await to(UserItemMarked.findAll({where:{userID:user.userID}}))
    if (err){
        TE(err)
    }
    return userItemsMarked
}
module.exports.getUserItemMarked = getUserItemMarked

const deleteItem = async (itemId)=>{
    let err, item
    [err, item] = await to(Item.findOne({
        where: {
            itemID: itemId
        }
    }))
    if (err){
        TE(err)
    }
    //delete file
    let result
    // check if (array length or  string length)
    if ( item.images.length > 0){
         util.asyncDeleteFiles(item.images).then((result)=>{
             console.log("delete file completed")
         })
    }
    [err, result] = await to(item.destroy())
    if (err){
        TE(err)
    }
    return result
}

module.exports.deleteItem = deleteItem

const addItemToStandFromTransaction = async(userId,itemId,standId)=>{
    let err,result
    [err,result] = await to(Item.update(
        {
            standID: standId,
            userID: userId
        },
        { where: { itemID: itemId } }
    ))
    if(err){
        TE(err.message)
    }
    return result
}
module.exports.addItemToStandFromTransaction = addItemToStandFromTransaction

// get all user for notification
const getAllUserForSendNotify = async(userId,condition)=>{
    let err,users;
    [err,users] = await to(User.findAll({
        where:{
            tokenFirebase: {
                [Op.ne]: null
            },
            userID :{
                [Op.ne]: null
            }
        },
        include:[
            {
                model: ConditionNotify,
                where:{
                    isEnable:true,
                    categoryID:condition.categoryID,
                    districtID : {
                        [Op.in]: [0, condition.districtID]
                    },
                    provinceID:condition.provinceID
                }
            }
        ]
    }));
    if (err){
        TE(err.message);
    }
    return users;
}
module.exports.getAllUserForSendNotify = getAllUserForSendNotify

const findOnMap = async(userId, queries)=>{
    let whereItem = {}, whereAddress = {};
    whereItem.userID = {
        [Op.ne]: userId
    }
    if (queries.categoryID) {
        whereItem.categoryID = queries.categoryID
    }
    if (queries.isFree) {
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
    }
    // let location = sequelize.literal(`ST_GeomFromText('POINT(${queries.latitude} ${queries.longitude})')`);
    // let distance = sequelize.fn('ST_Distance_Sphere', sequelize.literal('location'), location);
    let attributesAddress = Object.keys(Address.attributes);
    // attributes.push([distance,'distance']);
    let err, items, radius = parseInt(queries.radius);
    // [err, items] = await to(Item.findAll({
    //     where: whereItem
    //     ,
    //     include: [
    //         {
    //             model: Address,
    //             attributes: { include: [[sequelize.literal("6371 * acos(cos(radians(" + queries.latitude + ")) * cos(radians(latitude)) * cos(radians(" + queries.longitude + ") - radians(longitude)) + sin(radians(" + queries.latitude + ")) * sin(radians(latitude)))"), 'distance']] },
    //             // where: sequelize.where(sequelize.literal("(6371 * acos(cos(radians("+queries.latitude+")) * cos(radians(latitude)) * cos(radians("+queries.longitude+") - radians(longitude)) + sin(radians("+queries.latitude+")) * sin(radians(latitude)))) < " + radius)),
    //             where: sequelize.literal('6371 * acos(cos(radians(' + queries.latitude + ')) * cos(radians(latitude)) * cos(radians(' + queries.longitude + ') - radians(longitude)) + sin(radians(' + queries.latitude + ')) * sin(radians(latitude))) <= ' + radius),
    //             include: [
    //                 {
    //                     model: District
    //                 }

    //             ]
    //         }
    //     ]

    // }));
    let whereQuery='items.userID <> \''+ userId +'\'';
    if (queries.priceMax) {
       whereQuery = whereQuery + ' and items.price < '+ queries.priceMax
    } else if (queries.priceMin) {
        whereQuery = whereQuery + ' and items.price > '+ queries.priceMin
    }

    let query ='Select *,6371 * acos (cos ( radians(:lat) )* cos( radians( latitude ) )* cos( radians( longitude ) - radians(:long) )+ sin ( radians(:lat) )   * sin( radians( latitude ) ) ) AS `distance` '
    +' FROM items INNER JOIN addresses ON items.addressID = addresses.addressID INNER JOIN districts ON addresses.districtID = districts.districtID INNER JOIN provinces ON districts.provinceID = provinces.provinceID'
    + ' WHERE ' + whereQuery
    + ' GROUP BY items.itemID '
    + ' HAVING distance <= ' + radius 
    + ' ORDER BY distance ASC ;';
    [err, items] = await to (sequelize.query(query, { replacements: { lat: queries.latitude,long:queries.longitude }, model: Item }))
    if (err) {
        TE(err.message);
    }
    return items;
}
module.exports.findOnMap = findOnMap

const updateItem = async(userId,body,files)=>{
    let err, itemUpdated;
    let addressUpdate;
    if (!body.standID) {
        [err, addressUpdate] = await to(Address.update(
            {
                address: body.address,
                latitude: body.latitude,
                longitude: body.longitude,
                districtID: body.districtID
            },
            {
                where: {
                    addressID: body.addressID
                }
            })
        );
    }
    if (err){
        TE(err.message)
    }
    [err,itemUpdated] = await to(getItemDetail(userId,body.itemID));
    if(err){
        TE(err.message)
    }
    let images=[];
    if (body.deleteOldImage){
        util.asyncDeleteFiles(itemUpdated.images);
    }else{
        images.concat(itemUpdated.images);
    }
    let newImages;
    [err,newImages] = await to(util.saveImages(files,userId,CONFIG.image_item_path));
    if (err){
        TE(err.message)
    }
    
    let concatImages = images.concat(JSON.parse(newImages));
    
    // [err, itemUpdated] = await to(Item.update(
    //     {
    //         name:body.name
    //     },
    //     {

    //     })
    // );
    itemUpdated.name = body.name;
    itemUpdated.price = body.price;
    itemUpdated.images = JSON.stringify(concatImages);
    itemUpdated.description= body.description;
    itemUpdated.needToSell = body.needToSell;
    itemUpdated.categoryID = body.categoryID;
    let result; 
    [err,result] = await to(itemUpdated.save()); 
    if (err) {
        TE(err);
    }
    return result;
}
module.exports.updateItem = updateItem

