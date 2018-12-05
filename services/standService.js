'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Address,Stand,sequelize,User,Sequelize,UserStandFollow,ConditionNotify} = require('../models')
const Op = Sequelize.Op

var createStand = async(stand)=>{
    let err,standAdded
    [err,standAdded] = await to(Stand.create(stand))
    if (err){TE(err)}
    return standAdded
}
module.exports.createStand = createStand

var getMyStands = async (userId)=>{
    let err,stands
    [err,stands] = await to(Stand.findAll({
        where:{userID:userId},
        include:[
            {
                model: Address
            }
        ]
    }))
    if(err){
        TE(err)
    }
    return stands
}
module.exports.getMyStands = getMyStands

var getStands = async (userId,queries)=>{
    let err,stands,page
    if (queries.page== undefined){
        page = 0
    }
    [err, stands] = await to(Stand.findAll(
        {
            where: {
                userID: {
                    [Op.ne]: userId
                }
            },
            include:[
                {
                    model: Address
                }
            ],
            order: [ ['updatedAt', 'DESC']],
            offset: page * CONFIG.page_size_stand,
            limit: CONFIG.page_size_stand
        }))
    if(err){
        TE(err)
    }
    return stands
}
module.exports.getStands = getStands

const deleteStand = async(standId)=>{
    let err,stand
    [err,stand] = await to(Stand.findOne({
        where: {
            standID: standId
        }
    }))
    if (err){
        TE(err)
    }
    if ( stand.image.length > 0){
        util.asyncDeleteFiles(item.images).then((result)=>{
            console.log("delete file completed")
        })
   }
   let result
   [err,result] = await to(stand.destroy())
    if (err) {
        TE(err)
    }
    return true
}
module.exports.deleteStand = deleteStand


var getUserStandFollowed = async (user)=>{
    let err,userStand
    [err,userStand] = await to(UserStandFollow.findAll({where:{userID:user.userID}}))
    if (err){
        TE(err)
    }
    return userStand
}
module.exports.getUserStandFollowed = getUserStandFollowed
var followStand = async (userId,standId)=>{
    let err,userStand
    [err,userStand] = await to (UserStandFollow.create({userID:userId,standID:standId}))
    if(err){
        TE(err)
    }
        return userStand
}
module.exports.followStand = followStand

var unFollowStand = async (userId,standId)=>{
    let err, userStandFollowed
    [err, userStandFollowed] = await to(UserStandFollow.destroy({
        where: {
            userID: userId,
            standID: standId
        }
    }))
    if (err){
        TE(err)
    }
    return true
}
module.exports.unFollowStand = unFollowStand

const getAllUserFollowStand = async (standId)=>{
    let err,userFollows 
    [err,userFollows] = await to(UserStandFollow.findAll({
        where:{
            standID:standId
        },
        include:[
            {
                model: User,
                attributes: ['userID','tokenFirebase'],
                include:[{
                    model : ConditionNotify,
                    where:{
                        isEnable:true
                    }
                }
                ]
            }
        ]
    }))
    if (err){
        TE(err)
    }
    let users=[]
    userFollows.forEach(element => {
        users.push(element.User)
    });
    return users
}
module.exports.getAllUserFollowStand = getAllUserFollowStand

// get stand detail 

const getStandDetail = async (standId)=>{
    let err, stand
    [err,stand] = await to(Stand.findById(standId))
    if (err) {
        TE(err)
    }
    return stand
}
module.exports.getStandDetail = getStandDetail