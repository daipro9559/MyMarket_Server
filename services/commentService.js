'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Stand,sequelize,User,Sequelize,Comment} = require('../models')
const Op = Sequelize.Op

const getComments = async (standId, page) => {
    if (!page){
        page = 0
    }
    let err, comments
    [err,comments] = await to(Comment.findAll({
        where:{
            standID:standId
        },
        include:[{
            model:User,
            attributes:['userID','name','avatar']
        }],
        order: [['updatedAt', 'DESC']],
        offset: page * CONFIG.page_size_item,
        limit: CONFIG.page_size_item
    }));
    if (err){
        TE(err.message)
    }
    return comments;
}
module.exports.getComments = getComments

const createComment = async(comment)=>{
    let err,commentAdded;
    [err,commentAdded] = await to(Comment.create(comment));
    if (err){
        TE(err.message)
    }
    return commentAdded
}
module.exports.createComment = createComment