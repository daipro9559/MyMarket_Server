const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const itemController = require('../controllers/itemController')
const passport = require('passport')
const path = require('path')
require('../middleware/passport')(passport)
router.get('/', function(req, res, next) {
    res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
  });
  //authenticate
  router.post('/user/register',userController.create)
  router.post('/user/login',userController.login)
  router.post('/user/forgot', userController.forgot)
  router.post('/user/changePassByCode',userController.changePassByCode)
  router.post('/user/changePass',passport.authenticate('jwt', {session:false}),userController.changePassword)
  //item case
  router.get('/categories',passport.authenticate('jwt', {session:false}),itemController.getAllCategory)
  module.exports = router;