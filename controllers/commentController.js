'use strict'
const standService = require('../services/standService')
const commentService = require('../services/commentService')
const { to, ReE, ReS } = require('../services/utilService')
const status = require('http-status')
const util = require('../helper/util')
const CONFIG = require('../config/conf')

const getComments = async(req,res)=>{
    let err,comments;
    [err,comments] = await to(commentService.getComments(req.params.standID,req.query.page));
    if(err){
        ReE(res,err,status.NOT_IMPLEMENTED);
    }
    return ReS(res,comments,status.OK,"get comment completed",util.checkLastPage(comments.length))
}
module.exports.getComments = getComments

const createComment = async(req,res)=>{
    let err,commentAdded,comment={};
    comment.comment = req.body.comment;
    comment.userID = req.user.userID;
    comment.standID = req.params.standID;
    [err,commentAdded] = await to(commentService.createComment(comment));
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    return ReS(res,null,status.OK,"Comment success!")
}
module.exports.createComment = createComment;