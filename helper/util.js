'use strict'
const bcrypt = require('bcrypt')
const {to}  = require('../services/utilService')
const CONFIG = require('../config/conf')
const fs = require('fs')
const mkdirp = require('mkdirp');

// it random code from 100000-999999
const randomCode = function randomCode(){
    let min = Math.ceil(100000)
    let max = Math.floor(999999)
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

  module.exports.randomCode = randomCode

  const hashPassword = async (pw)=>{
    var salt, hash,err;
    [err, salt] = await to(bcrypt.genSalt(10));
    if (err) TE(err.message, true);
    [err, hash] = await to(bcrypt.hash(pw, salt));
    if (err) TE(err.message, true);
    return hash;
  }
  module.exports.hashPassword = hashPassword

  var getImagePath = (userID,fileName) =>{
    var date = new Date()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    var day = date.getDate()
    var pathDir = CONFIG.image_item_path + year + '/' + month + '/' + day + "/"
    var fileExtension = fileName.split(".")[1];
    var newFileName = userID + "-" + Date.now() +"."+fileExtension
    var fullPathImage = pathDir + newFileName
    if (!fs.existsSync(pathDir)){
      mkdirp.sync(pathDir)
    }
    return fullPathImage
  }
  module.exports.getImagePath = getImagePath


