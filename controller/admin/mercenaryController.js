const { Mercenary, Property, Weapon, UserMercenary } = require('../../models')
const customize = require('../../helpers/constructor')
const { Op } = require('sequelize')

const adminMercenaries = new customize.PageCss('adminMercenaries')
const adminMercenaryEdit = new customize.PageCss('adminMercenaryEdit')

const mercenaryController = {
  getMercenaries: async (req, res, next) => {
    try {
      const rawData = await Mercenary.findAll({
        attributes: [
          'id', 'name', 'propertyId', 'weaponId'
        ],
        raw: true,
        nest: true,
        include: [Property, Weapon]
      })
      const visitorData = rawData.map(element => ({
        id: element.id,
        name: element.name,
        property: element.Property.name,
        weapon: element.Weapon.name
      }))
      const property = await Property.findAll({ raw: true })
      const weapon = await Weapon.findAll({ raw: true })
      if (!rawData || !property) throw new Error('資料庫尚未建立資料！')
      if (!rawData) throw new Error('資料庫尚未建立資料！')
      if (req.user === undefined) {
        return res.render('admin/mercenaries', { data: visitorData, property, weapon, cssStyle: adminMercenaries.css })
      }
      const mineMercrnaryId = req.user && req.user.UserMercenaryUser.map(mine => mine.id)
      const data = rawData.map(element => ({
        id: element.id,
        name: element.name,
        property: element.Property.name,
        weapon: element.Weapon.name,
        isMineMercrnary: mineMercrnaryId.includes(element.id)
      }))
      res.render('admin/mercenaries', { data, property, weapon, cssStyle: adminMercenaries.css })
    } catch (err) {
      next(err)
    }
  },
  getMercenary: async (req, res, next) => {
    try {
      const id = req.params.id
      const data = await Mercenary.findByPk(
        id, {
          raw: true,
          nest: true,
          include: [Property, Weapon]
        })
      if (!data) throw new Error('傭兵不存在！')
      if (req.user === undefined) {
        return res.render('admin/mercenary', { data, cssStyle: adminMercenaries.css })
      }
      const mineMercrnaryId = req.user && req.user.UserMercenaryUser.map(mine => mine.id)
      data.isMineMercrnary = mineMercrnaryId.includes(data.id)
      res.render('admin/mercenary', { data, cssStyle: adminMercenaries.css })
    } catch (err) {
      next(err)
    }
  },
  editMercenary: async (req, res, next) => {
    try {
      const id = req.params.id
      const data = await Mercenary.findByPk(
        id, {
          raw: true,
          nest: true,
          include: [Property, Weapon]
        })
      const property = await Property.findAll({
        raw: true
      })
      const weapon = await Weapon.findAll({
        raw: true
      })
      if (!data) throw new Error('傭兵不存在！')
      if (!property || !weapon) throw new Error('資料庫出錯！')
      res.render('admin/mercenaryEdit', {
        data,
        property,
        weapon,
        cssStyle: adminMercenaryEdit.css
      })
    } catch (err) {
      next(err)
    }
  },
  putMercenary: async (req, res, next) => {
    try {
      const {
        name,
        propertyId,
        weaponId,
        hp,
        attack,
        attackSpeed,
        range,
        image
      } = req.body
      const mercenary = await Mercenary.findByPk(req.params.id)
      const emptyCheck = (element) => element === ''
      if (!mercenary) throw new Error('傭兵不存在！')
      if (Object.values(req.body).some(emptyCheck)) throw new Error('不能輸入空值！')
      await mercenary.update({
        name,
        propertyId,
        weaponId,
        hp,
        attack,
        attackSpeed,
        range,
        image
      })
      req.flash('success_messages', '更新傭兵資料成功！')
      res.redirect('/visitor/mercenaries')
    } catch (err) {
      next(err)
    }
  },
  deleteMercenary: async (req, res, next) => {
    try {
      const data = await Mercenary.findByPk(req.params.id)
      if (!data) throw new Error('傭兵不存在！')
      await UserMercenary.destroy({
        where: { mercenaryId: Number(req.params.id) }
      })
      await data.destroy()
      res.redirect('/visitor/mercenaries')
    } catch (err) {
      next(err)
    }
  },
  createMercenary: async (req, res, next) => {
    try {
      const property = await Property.findAll({
        raw: true
      })
      const weapon = await Weapon.findAll({
        raw: true
      })
      if (!property || !weapon) throw new Error('資料庫出錯！')
      res.render('admin/mercenaryCreate', {
        property,
        weapon,
        cssStyle: adminMercenaryEdit.css
      })
    } catch (err) {
      next(err)
    }
  },
  postMercenary: async (req, res, next) => {
    try {
      const {
        name,
        propertyId,
        weaponId,
        hp,
        attack,
        attackSpeed,
        range,
        image
      } = req.body
      const repeatCheck = await Mercenary.findOne({ where: { name } })
      if (repeatCheck) {
        req.flash('error_messages', '傭兵已存在！')
        return res.redirect('back')
      }
      const emptyCheck = (element) => element === ''
      if (Object.values(req.body).some(emptyCheck)) throw new Error('不能輸入空值！')
      await Mercenary.create({
        name,
        propertyId,
        weaponId,
        hp,
        attack,
        attackSpeed,
        range,
        image
      })
      req.flash('success_messages', '新增傭兵資料成功！')
      res.redirect('/visitor/mercenaries')
    } catch (err) {
      next(err)
    }
  },
  sort: async (req, res, next) => { // 應該能跟傭兵共用
    try {
      const { propertyId, weaponId } = req.body
      const rawData = await Mercenary.findAll({
        where: {
          [Op.or]: [{ propertyId }, { weaponId }]
        },
        include: [{
          model: Property
        }, {
          model: Weapon
        }],
        raw: true,
        nest: true
      })
      const visitorData = rawData.map(element => ({
        id: element.id,
        name: element.name,
        property: element.Property.name,
        weapon: element.Weapon.name
      }))
      const property = await Property.findAll({ raw: true })
      const weapon = await Weapon.findAll({ raw: true })
      if (!rawData || !property || !weapon) throw new Error('資料庫尚未建立資料！')
      if (req.user === undefined) {
        return res.render('admin/mercenaries', { data: visitorData, property, weapon, cssStyle: adminMercenaries.css })
      }
      const mineMercrnaryId = req.user && req.user.UserMercenaryUser.map(mine => mine.id)
      const data = rawData.map(element => ({
        id: element.id,
        name: element.name,
        property: element.Property.name,
        weapon: element.Weapon.name,
        isMineMercrnary: mineMercrnaryId.includes(element.id)
      }))
      res.render('admin/mercenaries', { data, property, weapon, cssStyle: adminMercenaries.css })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = mercenaryController
