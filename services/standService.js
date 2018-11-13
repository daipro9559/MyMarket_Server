'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Category,Address,Stand,sequelize,User,Sequelize} = require('../models')
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
    [err,stands] = await to(Stand.findAll({where:{userID:userId}}))
    if(err){
        TE(err)
    }
    return stands
}
module.exports.getMyStands = getMyStands

var getStands = async (userId)=>{
    let err,stands
    [err, stands] = await to(Stand.findAll(
        {
            where: {
                userID: {
                    [Op.ne]: userId
                }
            }
        }))
    if(err){
        TE(err)
    }
    return stands
}
module.exports.getStands = getStands