const nodemailer = require('nodemailer')
const CONFIG = require('../config/conf')
const { randomCode } = require('./util')
class SendMailHelper {
    constructor() {
        this.transporterGmail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: CONFIG.email,
                pass: CONFIG.passEmail
            }
        })
    }
    sendCodeToChangePassWord(user) {
        let code = randomCode()
        var mail = {
            from: CONFIG.email,
            to: user.email,
            subject: 'Forgot password',
            text: 'Code to change password : ' + code
        }
        this.transporterGmail.sendMail(mail, (err, info) => {
            console.log(err)
        })
        return code
    }
}
module.exports = SendMailHelper