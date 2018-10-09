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
    this.hasMany(models.Item,{foreignKey: 'userID',as: 'Items'})
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
    return "Bearer " + jwt.sign({ user_id: this.userID }, CONFIG.jwt_encryption, { expiresIn: exp_time });
  };
  User.prototype.toWeb = function(){
    let json = this.toJSON();
    return json;
  }
  return User;
}