const { User } = require('../models')
const bcrypt = require('bcryptjs')
const customize = require('../helpers/constructor')

const login = new customize.PageCss('login')

const userController = {
  loginPage: async (req, res, next) => {
    try {
      res.render('user/login', { cssStyle: login.css })
    } catch (err) {
      next(err)
    }
  },
  login: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/admin/mercenaries')
  },
  registerPage: async (req, res, next) => {
    try {
      res.render('user/register', { cssStyle: login.css })
    } catch (err) {
      next(err)
    }
  },
  register: async (req, res, next) => {
    try {
      const { email, password, confirmPassword } = req.body
      if (password !== confirmPassword) throw new Error('密碼錯誤')
      const user = await User.findOne({ where: { email } })
      if (user) {
        req.flash('error_messages', '信箱已經註冊過了！')
        return res.redirect('back')
      }
      console.log(email)
      console.log(password)
      const hash = await bcrypt.hash(password, 10)
      console.log(hash)
      await User.create({
        email,
        password: hash
      })
      res.render('user/login', { email, cssStyle: login.css })
    } catch (err) {
      next(err)
    }
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/')
  }
}

module.exports = userController
