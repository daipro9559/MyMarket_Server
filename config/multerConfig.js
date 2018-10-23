'use strict'
const CONFIG = require('./conf')
const fs = require('fs')

module.exports = (multer) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            var date = new Date()
            var month = date.getMonth() + 1
            var year = date.getFullYear()
            var day = date.getDate()
            var path = 'public/images/items/' + year + '/' + month + '/' + day + "/"
            if (!fs.existsSync(path)){
                fs.mkdirSync(path)
            }
            cb(null, path)
        },
        filename: (req, file, cb) => {
            var filename = file.originalname;
            var fileExtension = filename.split(".")[1];
            cb(null,req.user.userID +"-"+ Date.now() + "." + fileExtension);
        }
    })
}