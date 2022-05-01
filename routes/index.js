const express = require('express')
const router = express.Router()

// 路由載入
const home = require('./models/home')
const admin = require('./models/admin')

router.use('/admin', admin)
router.use('/', home)

module.exports = router
