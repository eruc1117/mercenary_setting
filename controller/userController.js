const { User, Mercenary, Weapon, Property, UserMercenary } = require('../models')
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
      const property = await Property.findAll({ raw: true })
      const weapon = await Weapon.findAll({ raw: true })
      if (!rawData || !property || !weapon) throw new Error('資料庫尚未建立資料！')
      const data = rawData.map(element => ({
        id: element.id,
        name: element.name,
        property: element.Property.name,
        weapon: element.Weapon.name,
        image: element.image
      }))
      res.render('user/mercenaries', { data, property, weapon, cssStyle: mercenaries.css })
    } catch (err) {
      next(err)
    }
  },
  addMyMercenary: async (req, res, next) => {
    try {
      const mercenary = await Mercenary.findByPk(req.params.id, { raw: true })
      const myMercenary = await UserMercenary.findOne({
        where: {
          userId: req.user.id,
          mercenaryId: Number(req.params.id)
        }
      })
      if (!mercenary) throw new Error('傭兵不存在！')
      if (myMercenary) throw new Error('已擁有該傭兵了')
      await UserMercenary.create({
        userId: req.user.id,
        mercenaryId: req.params.id
      })
      res.redirect('/visitor/mercenaries')
    } catch (err) {
      next(err)
    }
  },
  removeMyMercenary: async (req, res, next) => {
    try {
      const mercenary = await Mercenary.findByPk(req.params.id, { raw: true })
      if (!mercenary) throw new Error('傭兵不存在！')
      const myMercenary = await UserMercenary.findOne({
        where: {
          userId: req.user.id,
          mercenaryId: Number(req.params.id)
        }
      })
      await myMercenary.destroy()
      res.redirect('/visitor/mercenaries')
    } catch (err) {
      next(err)
    }
  },
  sortMercenaries: async (req, res, next) => { // 應該能跟傭兵共用
    try {
      const { propertyId, weaponId } = req.body
      console.log(propertyId)
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
      const data = []
      rawData.forEach(element => {
        const merWeaponId = element.Weapon.id
        const merPropertyId = element.Property.id
        if ((merPropertyId === Number(propertyId)) || (merWeaponId === Number(weaponId))) {
          data.push({
            id: element.id,
            name: element.name,
            image: element.image,
            property: element.Property.name,
            weapon: element.Weapon.name
          })
        }
      })
      const property = await Property.findAll({ raw: true })
      const weapon = await Weapon.findAll({ raw: true })
      if (!rawData || !property || !weapon) throw new Error('資料庫尚未建立資料！')
      res.render('user/mercenaries', { data, property, weapon, cssStyle: mercenaries.css })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = userController
