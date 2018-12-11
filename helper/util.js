'use strict'
const bcrypt = require('bcrypt')
const {to,TE}  = require('../services/utilService')
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

  var getImagePath = (userID,fileName,parent) =>{
    var date = new Date()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    var day = date.getDate()
    var pathDir
    if (parent==CONFIG.image_avatar_path){
    pathDir = parent
    }else{
     pathDir = parent + year + '/' + month + '/' + day + "/"
    }
    var fileExtension = fileName.split(".")[1];
    var newFileName = userID + "-" + Date.now() +"."+fileExtension
    var fullPathImage = pathDir + newFileName
    if (!fs.existsSync(pathDir)){
      mkdirp.sync(pathDir)
    }
    return fullPathImage
  }
  module.exports.getImagePath = getImagePath


  const checkLastPage = (size)=>{
    if (size<CONFIG.page_size_item){
      return true
    }
    return false
  }
  module.exports.checkLastPage = checkLastPage

const asyncDeleteFiles = (imagePaths) => {
  return new Promise((resolve, reject) => {
    if (Array.isArray(imagePaths)) {
      imagePaths.forEach(element => {
        fs.unlink("public/" + element, (err) => {
          if (err) {
            reject(err)
          }
        })
      })
      resolve(true)
    } else if (imagePaths != null && imagePaths.length > 0) {
        fs.unlink("public/" + element, (err) => {
          if (err) {
            reject(err)
          }else{
            resolve(true)
          }
        })
      }else{
        // no have file
        resolve(true)
      }
  })
}

module.exports.asyncDeleteFiles = asyncDeleteFiles

// save file to server and return json imagePaths to save database

const saveImages = async (imageFiles,userID,parent) => {
  // check files
  if (imageFiles) {
    let err,result
    var files = imageFiles.images
    var imagePath = [], imagePathApi = []
    if (Array.isArray(files)) {
      for (var i = 0; i < files.length; i++) {
        var path = getImagePath(userID, files[i].name, parent);
        imagePath.push(path);
        imagePathApi.push(path.substr(7, path.length));
        [err, result] = await to(files[i].mv(path))
        if (err) {
          TE(err)
        }
      }
    } else {
      var path = getImagePath(userID, files.name, parent);
      imagePath.push(path);
      imagePathApi.push(path.substr(7, path.length));
      [err, result] = await to(files.mv(path))
      if (err) {
        TE(err)
      }
    }
    
    return JSON.stringify(imagePathApi);//convert array image path to json
  } else {
    return JSON.stringify([])
  }
}
module.exports.saveImages = saveImages