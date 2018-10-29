require('dotenv').config()
let CONFIG={}
CONFIG.env = process.env.ENV
CONFIG.port = process.env.PORT
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION
CONFIG.jwt_expiration  = 3600*24*10000
CONFIG.email = "daipro9559@gmail.com"
CONFIG.passEmail = "dainguyen95"
CONFIG.code_expiration = 3600*24 //1 day
CONFIG.image_item_path = 'public/images/items/'
module.exports = CONFIG