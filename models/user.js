'use strict'
const bcrypt = require('bcrypt');
const bcrypt_promise = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const { to,TE } = require('../services/utilService');

const CONFIG = require('../config/conf');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userID: {
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    tokenFireBase:{
      type: DataTypes.STRING,
      allowNull: true, // null when user logout
      unique: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail:
          { msg: "Email invalid." }
      }
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: { args: [7, 20], msg: "Phone number invalid, too short." },
        isNumeric: { msg: "not a valid phone number." }
      }
    },
    password: {
      type: DataTypes.STRING,
    },
    userType:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 0 // 0: user is person,1 user -> seller
    },
    code:{
      type:DataTypes.INTEGER,
    },
    codeExp:{
      type:DataTypes.INTEGER	
    },
    avatar:{
      type: DataTypes.STRING,
      allowNull:true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  // ưu tiên bảng nối item dánh dấu. boi viet cau truy van se dai hon
  User.associate = function (models) {
        // associations can be defined here
    this.hasMany(models.Item,{foreignKey: 'userID',as: 'Items'})
    this.hasMany(models.Stand,{foreignKey: 'userID',as: 'Stands'})
    this.hasMany(models.UserItemMarked,{foreignKey: 'userID'})
    this.hasMany(models.UserStandFollow,{foreignKey: 'userID'})
    this.belongsTo(models.Address, {foreignKey: 'addressID',allowNull:true})
    this.belongsToMany(models.Notification, {through: 'UserNotifications',foreignKey: 'userID'})
    this.hasOne(models.ConditionNotify,{foreignKey:'userID'})
    this.hasMany(models.Comment,{foreignKey: 'userID'})
  };

  User.beforeSave(async function (user, options){
    let err;
    if (user.changed('password')) {
      let salt, hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);
      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) TE(err.message, true);
      user.password = hash;
    }
  });

  User.prototype.comparePassword = async function(pw) {
    let err, pass
    if(!this.password) {
      TE('password not set')
    }
    [err, pass] = await to(bcrypt_promise.compare(pw, this.password))
    if (err) {TE(err)}
    if (!pass) {TE('invalid password')}
    return this
  }

  User.prototype.getJWT = function(){
    let exp_time = parseInt(CONFIG.jwt_expiration);
// <<<<<<< HEAD
//     let dataToken = {},token;
//     dataToken.user_id = this.id
//     dataToken.time = Date.now()
//     token = jwt.sign(dataToken,CONFIG.jwt_encryption)
//     return "Bearer " + token;
// =======
    return "Bearer " + jwt.sign({ user_id: this.userID }, CONFIG.jwt_encryption, { expiresIn: exp_time });
// >>>>>>> feature/category
  };
  User.prototype.toWeb = function(){
    let json = this.toJSON();
    return json;
  }
  return User;
}