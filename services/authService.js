// const {User}= require('../model')
'use strict'
const validator = require('validator')
const {to,TE} = require('../services/utilService')
const {User} = require('../models')


const createUser = async (userInfo) => {    
    let email, auth_info
    auth_info = {}
    auth_info.status = 'create'
    email = userInfo.email
    if(!email) TE('An email or phone number was not entered.');
    if (validator.isEmail(email)) {
        var err,user
        [err, user] = await to(User.create(userInfo))
        console.error(err)
        if(err) TE(err.message);
        return user
    }
}
module.exports.createUser = createUser

const authUser = async function(userInfo){
    console.log(userInfo.email)
    if (!userInfo.email) TE('Please enter email to login')
    if (!userInfo.password) TE('Please enter password to login')
    let userAuth;
    [err,userAuth] = await to(User.findOne({where:{email:userInfo.email}}))
    if (!userAuth) TE('Not register')
    [err,userAuth] = await to (User.comparePassword(userInfo.password))
    if (err) TE(err.message)
    return userAuth
}
module.exports.authUser = authUser