'use strict'
const validator = require('validator')
const { to, TE } = require('./utilService')
const { User,Address,District,ConditionNotify } = require('../models')
const SendMailHelper = require('../helper/sendMail')
const CONFIG = require('../config/conf')
const {hashPassword} = require('../helper/util');

var sendMail = new SendMailHelper()
const createUser = async (userInfo) => {
    let email, auth_info
    auth_info = {}
    auth_info.status = 'create'
    email = userInfo.email
    if (!email) TE('An email was not entered.');
    if (validator.isEmail(email)) {
        var err, user
        userInfo.userRoleID = 2;// default as UserRole
        [err, user] = await to(User.create(userInfo))
        if (err) TE(err.message);
        return user
    }
}
module.exports.createUser = createUser

const authUser = async function (userInfo) {
    if (!userInfo.email) TE('Please enter email to login');
    if (!userInfo.password) TE('Please enter password to login');
    let user,err
    [err, user] = await to(User.findOne(
        {
            where: {
                email: userInfo.email
            },
            include:[{
                model:Address
            }]
        }));
    if (err) {
        TE('Not register');
    }
    [err, user] = await to(user.comparePassword(userInfo.password));
    if (err) {
        TE(err.message);
    }
    user.tokenFirebase = userInfo.tokenFirebase
    let userUpdate
    [err, userUpdate] = await to (user.save());
    if (err){
        TE(err)
    }
     userUpdate.password = undefined
     userUpdate.tokenFirebase = undefined
    return userUpdate
}
module.exports.authUser = authUser

var forgotPass = async (userEmail) => {
    if (!userEmail) {
        TE("please enter email");
    }
    let user
    [err, user] = await to(User.findOne({ where: { email: userEmail } }))
    if (err) {
        console.log(err.message)
        TE("email is not register")
    }
    var code = sendMail.sendCodeToChangePassWord(user)
    var codeExp = Date.now() + CONFIG.code_expiration
    user.code = code
    user.codeExp = codeExp
    [err, user] = await to(User.update({ code: code, codeExp: codeExp }, { returning: true, where: { userID: user.userID } }))
    if (err) {
        TE(err)
    }
    return true
}
module.exports.forgotPass = forgotPass

var changePassByCode = async (userInfo) => {
    let inputEmail = userInfo.email, code = userInfo.code
    if (!inputEmail) {
        TE("email is null, please enter!")
    }
    let user,err
    [err, user] = await to(User.findOne({ where: { email: inputEmail } }))
    if (err) {
        TE(err.message)
    }
    if (code != user.code) {
        TE("Code is not correct!")
    }
    if (user.codeExp < Date.now()) {
        TE("Code is expired")
    }
    let dataUpdate = {password:userInfo.password,code:0,codeExp:0}
    user.set(dataUpdate)
    [err, user] = await to(user.save())
    if (err){
        TE(err.message)
    }
    return user
}
module.exports.changePassByCode = changePassByCode

// change password in case  normal


var getAllUser = async ()=>{
    let users;
    [err,users] = await to (User.findAll())
    if (err) {
        TE(err.message)
    }
    return users
}
module.exports.getAllUser = getAllUser
const changePassword = async (user,userInput)=>{
    // let user,data
    let oldPass = userInput.oldPassword,newPass = userInput.newPassword
    let err,result
    [err,result] = await to( user.comparePassword(oldPass))
    if (err) {
        TE(err)
    }
    user.set({password:newPass})
    [err,user] = await to(user.save())
    if (err) {
        TE(err)
    }
    return true
}
module.exports.changePassword = changePassword

// userID 
const getProfile = async (userId)=>{
    let err,user
    [err,user] = await to(User.findOne({
         where:{userID:userId},
        include: [
            {
                model: Address
            }
        ]
        }));
    if (err){
        TE(err)
    }
    return user
}
module.exports.getProfile = getProfile

var updateToSeller = async (user)=>{
    let err,userUpdate
    [err,userUpdate] = await to(user.update({userType:1}))
    if (err){ TE (err)}
    return true
}
module.exports.updateToSeller = updateToSeller

// when user logout delete firebase token , it need for don't receive notification
const logout = async (user)=>{
    let err,userUpdated
    [err,user] = await to(user.update({tokenFirebase:null}))
    if (err){TE(err)}
    return  true
}
module.exports.logout = logout

const getUsers = async(query)=>{
    let err, users,page
    if (!query.page){
        page = 0
    }else{
        page = query.page
    }
    [err, users] = await to(User.findAll(
        {
            include: [
                {
                    model: Address,
                    include: [
                        {
                            model: District,
                        },
                    ]
                }
            ],
            order: [ ['createdAt', 'DESC']],
            offset: page * CONFIG.page_size_item,
            limit: CONFIG.page_size_item
        }))
    if (err) {
        TE(err.message)
    }
    return users
}
module.exports.getUsers = getUsers

const addAddress = async(user,body)=>{
    let err,addressAdded;
    [err,addressAdded] = await to(Address.create({
        address : body.address,
        districtID: body.districtID
    }));
    if (err){
        TE(err.message)
    }
    let updateResult ;
    user.addressID = addressAdded.addressID;
    [err,updateResult] = await to(user.save())
    if (err){
        TE(err.message);
    }
    // update to conditionNotification
    [err,updateResult] = await to( ConditionNotify.update(
        {
            districtID: body.districtID,
            provinceID: body.provinceID
        }, /* set attributes' value */
        { where: { userID: user.userID }}
      ));
      if(err){
          TE(err.message);
      }
    return updateResult
}
module.exports.addAddress = addAddress
