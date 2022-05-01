const express = require('express')
const router = express.Router()
const { generalErrorHandler } = require('../middleware/error-handler')
// 路由載入
const home = require('./models/home')
const admin = require('./models/admin')

router.use('/admin', admin)
router.use('/', home)
router.use('/', generalErrorHandler)
module.exports = router
