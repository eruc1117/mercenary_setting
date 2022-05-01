const express = require('express')
const router = express.Router()
const adminController = require('../../controller/adminController')

router.get('/index', adminController.getMercenary)

module.exports = router
