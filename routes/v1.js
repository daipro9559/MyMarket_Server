const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const passport = require('passport')
const path = require('path')
require('../middleware/passport')(passport)
router.get('/', function(req, res, next) {
    res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
  });
  router.post('/user/register',userController.create)
  module.exports = router;