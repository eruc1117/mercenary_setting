const express = require('express')
const router = express.Router()
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticated } = require('../middleware/auth')
// 路由載入
const home = require('./models/home')
const admin = require('./models/admin')
const user = require('./models/user')
const visitor = require('./models/visitor')

router.use('/admin', authenticated, admin)
router.use('/user', user)
router.use('/visitor', visitor)
router.use('/', home)
router.use('/', generalErrorHandler)

module.exports = router
