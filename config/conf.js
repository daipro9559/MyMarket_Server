require('dotenv').config()
let CONFIG={}
CONFIG.env = process.env.ENV
CONFIG.port = process.env.PORT
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION
CONFIG.jwt_expiration  = 3600*24*7// 7 day
CONFIG.email = "daipro9559@gmail.com"
CONFIG.passEmail = "dainguyen95"
CONFIG.code_expiration = 3600*24 //1 day
CONFIG.image_item_path = 'public/images/items/'
CONFIG.image_avatar_path = 'public/images/avatars/'
CONFIG.image_stand_path = 'public/images/stands/'

CONFIG.page_size_item = 15
CONFIG.page_size_stand = 15

//firebase
CONFIG.collapse_key="com.example.dainv.mymarket"
CONFIG.serverKey = 'AAAAlPX8D7I:APA91bEoZctTWTy5wXhzjOL9Q8M_uK6iH_guXD_DTWyMdD2KN428e1-rWkG4NIxln5HBULix-oQwS6Tln1hMgzJygAxoSzJHzA51_6o4XheY5u5tT4JxfIuosaD5a6h3VqptHJyAUyJq'
module.exports = CONFIG