const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')

const userController = require('../../controller/userController')

router.post('/login', passport.authenticate('local',
  { failureRedirect: '/user/login', failureFlash: true }), userController.login)
router.get('/login', userController.loginPage)
router.get('/register', userController.registerPage)
router.post('/register', userController.register)
router.get('/logout', userController.logout)

module.exports = router
