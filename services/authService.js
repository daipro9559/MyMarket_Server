const validator = require('validator')
const { to, TE } = require('../services/utilService')
const { User } = require('../models')
const SendMailHelper = require('../helper/sendMail')
const CONFIG = require('../config/conf')
const {hashPassword} = require('../helper/util');

var sendMail = new SendMailHelper()
const createUser = async (userInfo) => {
    let email, auth_info
    auth_info = {}
    auth_info.status = 'create'
    email = userInfo.email
    if (!email) TE('An email or phone number was not entered.');
    if (validator.isEmail(email)) {
        var err, user
        [err, user] = await to(User.create(userInfo))
        if (err) TE(err.message);
        return user
    }
}
module.exports.createUser = createUser

const authUser = async function (userInfo) {
    if (!userInfo.email) TE('Please enter email to login')
    if (!userInfo.password) TE('Please enter password to login')
    let user
    [err, user] = await to(User.findOne({ where: { email: userInfo.email } }))
    if (!user) {
        TE('Not register')
    }
    [err, user] = await to(user.comparePassword(userInfo.password))
    if (err) {
        TE(err.message)
    }
    return user
}
module.exports.authUser = authUser

const forgotPass = async (userEmail) => {
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
    [err, user] = await to(User.update({ code: code, codeExp: codeExp }, { returning: true, where: { id: user.id } }))
    if (err) {
        TE(err)
    }
    return true
}
module.exports.forgotPass = forgotPass

const changePassByCode = async (userInfo) => {
    let inputEmail = userInfo.email, code = userInfo.code
    if (!inputEmail) {
        TE("email is null, please enter!")
    }
    var user,err
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
    var passHashed,err;
    [err,passHashed] = await to (hashPassword(userInfo.password));
    if (err){ 
        TE(err.message);
    }
    [err, user] = await to(User.update({ password: passHashed, code: 0, codeExp: 0 },
        { returning: true, where: { id: user.id } }))
    return user

}
module.exports.changePassByCode = changePassByCode