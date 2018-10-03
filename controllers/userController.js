'use strict'
const authService = require('../services/authService')
const {to,ReE,ReS} = require('../services/utilService')
const status = require('http-status')

module.exports.create = async (req,res)=>{
    var body = req.body
    if (!body.email){
        return ReE(res,"please enter email")
    }else{
        var err,user
        [err,user] = await to(authService.createUser(body))
        if (err) return ReE(res,err,422)
        var dataResponse ={}
        dataResponse.message="Create User successfully!"
        dataResponse.user = user.toWeb()
        return ReS(res,dataResponse,200)
    }
}

module.exports.login = async (req,res)=>{
    let userInfo={};
    userInfo.email = req.body.email;
    userInfo.password = req.body.password;
    var err,user;
     [err,user] = await to(authService.authUser(userInfo));
     if (err) return ReE(res,err,201);
     let dataResponse={}
     dataResponse.message = "Login successfully"
     dataResponse.user = user.toWeb()
     dataResponse.token=user.getJWT()
     return ReS(res,dataResponse,status.OK)
}
module.exports.forgot = async (req,res)=>{
    let email = req.body.email,err,success
    [err,success] = await to(authService.forgotPass(email))
    if(err) {
       return ReE(res,err,status.NOT_FOUND)
    }
    if(!success){
       return ReS(res,{message:"can't do this action"})
    }else{
      return  ReS(res,{message:"Please check mail to receive code"})
    }
 }

 module.exports.changePassByCode  = async (req,res)=>{
     let userInfo = req.body,err,user
     [err,user] = await to(authService.changePassByCode(userInfo))
     if (err){
       return  ReE(res,err,status.NOT_ACCEPTABLE)
     }
     var dataResponse = {}
     dataResponse.message = "Change password successfully"
     dataResponse.email = user.email
     return ReS(res,dataResponse,status.OK)
 }

 module.exports.changePassword = async (req,res)=>{
          
 }
 module.exports.getAllUser = async (req,res) =>{
    let err,users 
    [err,users] = await to(authService.getAllUser())
    if (err){
        return ReE(res,err.message,status.NOT_IMPLEMENTED)
    }
    return ReS(res,users,status.OK)
 }