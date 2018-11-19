require('dotenv').config()
let CONFIG={}
CONFIG.env = process.env.ENV
CONFIG.port = process.env.PORT
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION
CONFIG.jwt_expiration  = 3600*24*7
CONFIG.email = "daipro9559@gmail.com"
CONFIG.passEmail = "dainguyen95"
CONFIG.code_expiration = 3600*24 //1 day
CONFIG.image_item_path = 'public/images/items/'
CONFIG.image_avatar_path = 'public/images/avatars/'
CONFIG.image_stand_path = 'public/images/stands/'

CONFIG.page_size_item = 15
CONFIG.page_size_stand = 10

//firebase
CONFIG.collapse_key="com.example.dainv.mymarket"
module.exports = CONFIG