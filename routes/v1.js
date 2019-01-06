const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const itemController = require('../controllers/itemController')
const standController = require('../controllers/standController')
const addressController = require('../controllers/addressController')
const notificationController = require('../controllers/notificationController')
const transactionController = require('../controllers/transactionController')
const commentController = require('../controllers/commentController')
const multer = require('multer')
const passport = require('passport')
const path = require('path')
require('../middleware/passport')(passport)
var storeItems = require('../config/multerConfig')(multer)
// var storeItems = require('../config/multerConfig')(multer)
router.use(express.static('public'))
router.use(express.static('files'))
//init upload
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images/items')
//   },
//   filename: (req, file, cb) => {
//     cb(null,  Date.now()+".jpg")
//   }
// })
var upload = multer({storage: storeItems});

router.get('/', function(req, res, next) {
    res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
  });


  //authenticate
  router.post('/user/register',userController.create)
  router.post('/user/login',userController.login)
  router.post('/user/forgot', userController.forgot)
  router.post('/user/logout',passport.authenticate('jwt', {session:false}),userController.logout)
  // router.post('/user/:userID',passport.authenticate('jwt', {session:false}),userController.logout)
  router.post('/user/changePassByCode',userController.changePassByCode)
  router.post('/user/changePass',passport.authenticate('jwt', {session:false}),userController.changePassword)
  router.get('/user/phone',passport.authenticate('jwt', {session:false}),userController.getPhoneSeller)
//user case
  router.get('/user/profile',passport.authenticate('jwt', {session:false}),userController.getProfile)
  router.get('/user/profile/:userID',passport.authenticate('jwt', {session:false}),userController.getProfile)
  router.post('/user/updateToSeller',passport.authenticate('jwt', {session:false}),userController.updateToSeller)
  router.post('/user/addAddress',passport.authenticate('jwt', {session:false}),userController.addAddress)

  //item case
  router.get('/categories',passport.authenticate('jwt', {session:false}),itemController.getAllCategory)
  router.get('/items',passport.authenticate('jwt',{session:false}),itemController.getItems)
  router.get('/items/findOnMap',passport.authenticate('jwt',{session:false}),itemController.findOnMap)
  router.post('/items',passport.authenticate('jwt',{session:false}),itemController.addItem)
  router.post('/items/mark',passport.authenticate('jwt',{session:false}),itemController.markItem)
  router.get('/items/mark',passport.authenticate('jwt',{session:false}),itemController.getMarkedItems)
  router.delete('/items/mark/:itemID',passport.authenticate('jwt',{session:false}),itemController.unMarkItem)
  router.delete('/items/:itemID',passport.authenticate('jwt',{session:false}),itemController.deleteItem)
  router.get('/items/:itemID',passport.authenticate('jwt',{session:false}),itemController.getItemDetail)
  // router.get('items/myItems',passport.authenticate('jwt',{session:false}),itemController.getItems)
  // address case
  router.get('/provinces',passport.authenticate('jwt', {session:false}),addressController.getAllProvince)
  router.get('/provinces/:provinceID/districts',passport.authenticate('jwt', {session:false}),addressController.getAllDistrict)
  //stand case...................................
  //create
  router.post('/stands',passport.authenticate('jwt',{session:false}),standController.createStand)
  router.post('/stands/items',passport.authenticate('jwt',{session:false}),standController.addItemToStand)
  router.put('/stands/:standID/items',passport.authenticate('jwt',{session:false}),standController.addItemToStandFromTransaction)
  router.get('/stands',passport.authenticate('jwt', {session:false}),standController.getStands)
  router.get('/stands/myStands',passport.authenticate('jwt', {session:false}),standController.getMyStands)
  router.delete('/stands/:standID',passport.authenticate('jwt', {session:false}),standController.deleteStand)
  router.post('/stands/follow',passport.authenticate('jwt',{session:false}),standController.followStand)
  router.delete('/stands/follow/:standID',passport.authenticate('jwt',{session:false}),standController.unFollow)
  router.get('/stands/:standID/comments',passport.authenticate('jwt',{session: false}),commentController.getComments)
  router.post('/stands/:standID/comments',passport.authenticate('jwt',{session: false}),commentController.createComment)

// case notifications
router.get('/notifications', passport.authenticate('jwt', { session: false }), notificationController.getNotifications)
router.get('/conditionNotify', passport.authenticate('jwt', { session: false }), notificationController.getConditionNotify)
router.post('/conditionNotify/:conditionID', passport.authenticate('jwt', { session: false }),notificationController.saveSettingCondition)
router.delete('/notifications/:notificationID', passport.authenticate('jwt', { session: false }),notificationController.deleteNotification)
router.post('/notifications/requestBuyItem',passport.authenticate('jwt', { session: false }),notificationController.requestByItem)

//transaction
// confirm transaction
router.post('/transactions',passport.authenticate('jwt', { session: false }),transactionController.confirmTransaction)
router.get('/transactions',passport.authenticate('jwt', { session: false }),transactionController.getTransaction)

// admin
router.get('/admin/users',passport.authenticate('jwt', { session: false }),userController.getUsers)

module.exports = router