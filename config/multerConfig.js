'use strict'
const CONFIG = require('./conf')

module.exports = (multer) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            var date = new Date()
            var month = date.getMonth() + 1
            var year = date.getFullYear()
            var day = date.getDate()
            var path = 'public/images/items/' + year + '/' + month + '/' + day + "/"
            cb(null, path)
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '_' + file.originalname)
        }
    })
}