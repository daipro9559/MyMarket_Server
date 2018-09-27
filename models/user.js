'use strict'
const bcrypt = require('bcrypt')
const bcrypt_promise = require('bcrypt-promise')
const jwt = require('jsonwebtoken')
const { to,TE } = require('../services/utilService');

const CONFIG = require('../config/conf')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail:
          { msg: "Phone number invalid." }
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
  });
  User.associate = function (models) {
    // associations can be defined here
  };

  User.beforeSave(async (user, options) => {
    let err
    if (user.changed('password')) {
      let salt, hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);
      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) TE(err.message, true);
      user.password = hash;
    }
  });

  User.prototype.comparePassword = async (pw) => {
    let err, pass
    if (!this, password) {
      console.log("password is not set")
    }
    [err, pass] = await bcrypt.compare(pw, this.password)
    if (err) console.log(err)
    if (!pass) console.log("invalid password")
    return this
  }

  User.prototype.getJWT = () => {
    let exp_time = parseInt(CONFIG.jwt_expiration)
    return "Bearer " + jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, { expiresIn: exp_time })
  };
  User.prototype.toWeb = (pw) => {
    let json = this.toJSON()
    return json
  }
  return User
}