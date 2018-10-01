const validator = require('validator')
const { to, TE } = require('../services/utilService')
const { User } = require('../models')


const createUser = async (userInfo) => {
    let email, auth_info
    auth_info = {}
    auth_info.status = 'create'
    email = userInfo.email
    if (!email) TE('An email or phone number was not entered.');
    if (validator.isEmail(email)) {
        var err, user
        [err, user] = await to(User.create(userInfo))
        console.error(err)
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
    if (err) TE(err.message)
    return user
}
module.exports.authUser = authUser