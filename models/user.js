'use strict'
const bcrypt = require('bcrypt');
const bcrypt_promise = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const { to,TE } = require('../services/utilService');

const CONFIG = require('../config/conf');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    code:{
      type:DataTypes.INTEGER
    },
    codeExp:{
      type:DataTypes.INTEGER	
    }
  });
  User.associate = function (models) {
    // associations can be defined here
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
    let dataToken = {},token;
    dataToken.user_id = this.id
    dataToken.time = Date.now()
    token = jwt.sign(dataToken,CONFIG.jwt_encryption)
    return "Bearer " + token;
  };
  User.prototype.toWeb = function(){
    let json = this.toJSON();
    return json;
  }
  return User;
}