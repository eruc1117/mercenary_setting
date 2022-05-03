const { User, Mercenary, Weapon, Property } = require('../models')
const bcrypt = require('bcryptjs')
const customize = require('../helpers/constructor')

const mercenaries = new customize.PageCss('userMercenaries')
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
    res.redirect('/visitor/mercenaries')
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
      const hash = await bcrypt.hash(password, 10)
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
  },
  getMercenaries: async (req, res, next) => {
    try {
      const rawData = await Mercenary.findAll(
        {
          include: [{
            model: User,
            as: 'UserMercenaryMercenary',
            where: { id: req.user.id }
          }, {
            model: Weapon
          },
          {
            model: Property
          }],
          raw: true,
          nest: true

        })
      if (!rawData) throw new Error('資料庫尚未建立資料！')
      const data = rawData.map(element => ({
        id: element.id,
        name: element.name,
        property: element.Property.name,
        weapon: element.Weapon.name,
        image: element.image
      }))
      res.render('user/mercenaries', { data, cssStyle: mercenaries.css })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = userController
