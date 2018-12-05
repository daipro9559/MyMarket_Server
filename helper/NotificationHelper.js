'use strict'
const util = require('../helper/util')
const CONFIG = require('../config/conf')
const FCM = require('fcm-node')
const fcm = new FCM(CONFIG.serverKey)