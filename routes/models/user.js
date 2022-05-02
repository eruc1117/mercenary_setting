const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')
const { authenticated } = require('../../middleware/auth')

const userController = require('../../controller/userController')

router.post('/login', passport.authenticate('local',
  { failureRedirect: '/user/login', failureFlash: true }), userController.login)
router.get('/login', userController.loginPage)
router.get('/register', userController.registerPage)
router.post('/register', userController.register)
router.get('/logout', userController.logout)
router.get('/mercenaries', authenticated, userController.getMercenaries)

module.exports = router
