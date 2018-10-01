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
        return ReS(res,{message:"Create User successfully!"},200)
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