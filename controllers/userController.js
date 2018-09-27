const {User} = require('../models')
const authService = require('../services/authService')
const {to,ReE,ReS} = require('../services/utilService')

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