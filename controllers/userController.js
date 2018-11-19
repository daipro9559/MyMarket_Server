'use strict'
const userService = require('../services/userService')
const { to, ReE, ReS } = require('../services/utilService')
const status = require('http-status')

module.exports.create = async (req, res) => {
    var body = req.body
    if (!body.email) {
        return ReE(res, "please enter email")
    } else {
        var err, user
        [err, user] = await to(userService.createUser(body))
        if (err) return ReE(res, err, 422)
        var dataResponse  = user.toWeb()
        return ReS(res, dataResponse, 200,"Create user successfully!")
    }
}

module.exports.login = async (req, res) => {
    let userInfo = {}
    userInfo.email = req.body.email
    userInfo.password = req.body.password
    userInfo.tokenFireBase = req.body.tokenFireBase
    var err, user
    [err, user] = await to(userService.authUser(userInfo))
    if (err) return ReE(res, err, status.NOT_IMPLEMENTED)
    let dataResponse = {}
    dataResponse.user = user.toWeb()
    dataResponse.token = user.getJWT()
    return ReS(res, dataResponse, status.OK,"Login successfully")
}
module.exports.forgot = async (req, res) => {
    let email = req.body.email, err, success
    [err, success] = await to(userService.forgotPass(email))
    if (err) {
        return ReE(res, err, status.NOT_FOUND)
    }
    if (!success) {
        return ReS(res, { message: "can't do this action" })
    } else {
        return ReS(res, { message: "Please check mail to receive code" })
    }
}

module.exports.changePassByCode = async (req, res) => {
    let userInfo = req.body, err, user
    [err, user] = await to(userService.changePassByCode(userInfo))
    if (err) {
       return  ReE(res, err, status.NOT_ACCEPTABLE)
    }
    var dataResponse = {}
    dataResponse.message = "Change password successfully"
    dataResponse.email = user.email
    return ReS(res, dataResponse, status.OK)
}

module.exports.changePassword = async (req, res) => {
    let user = req.user,userInput=req.body,err,result
    [err,result] = await to(userService.changePassword(user,userInput))
    if (err){
        return ReE(res,err,status.NOT_ACCEPTABLE)
    }
    let code = 200
    if (!result){
        return ReS(res,{message:"can't change password"},code)
    }
    return ReS(res,{message:"change password completed"},code)
}

const getPhoneSeller = async (req,res)=>{
    let sellerId = req.query.sellerID
    let err,user
    [err,user] = await to(userService.getProfile(sellerId))
    if (err){
        return ReE(res,err,status.NOT_FOUND)
    }
    let data = {}
    data.phone = user.phone
    return ReS(res,data,status.OK)
}
module.exports.getPhoneSeller = getPhoneSeller

const getProfile = async (req,res)=>{
    let err, user
    [err,user] = await to (userService.getProfile(req.user.userID))
    if (err){
        return ReE(res,err.message,status.NOT_IMPLEMENTED)
    }
    user.password =""

    return ReS(res,user.toWeb(),status.OK)
}
module.exports.getProfile = getProfile

var updateToSeller = async (req,res)=>{
    let err,result 
    [err,result] = await to(userService.updateToSeller(req.user))
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    return ReS(res,null,status.OK,"update to seller completed")
}
module.exports.updateToSeller = updateToSeller

const logout = async (req,res)=>{
    let err,result 
    [err,result] = await to(userService.logout(req.user))
    if (err){
        return ReE(res,err,status.NOT_IMPLEMENTED)
    }
    return ReS(res,null,status.OK,"Logout completed!")
}
module.exports.logout = logout