const { Mercenary, Property, Weapon } = require('../models')
const customize = require('../helpers/constructor')

const adminMercenaries = new customize.PageCss('adminMercenaries')
const adminMercenaryEdit = new customize.PageCss('adminMercenaryEdit')

const adminController = {
  getMercenaries: async (req, res, next) => {
    try {
      const data = await Mercenary.findAll({
        attributes: [
          'id', 'name', 'propertyId', 'weaponId'
        ],
        raw: true,
        nest: true,
        include: [Property, Weapon]
      })
      if (!data) throw new Error('資料庫尚未建立資料！')
      res.render('admin/mercenaries', { data, cssStyle: adminMercenaries.css })
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
      res.redirect('/admin/mercenaries')
    } catch (err) {
      next(err)
    }
  },
  deleteMercenary: async (req, res, next) => {
    try {
      const data = await Mercenary.findByPk(req.params.id)
      if (!data) throw new Error('傭兵不存在！')
      data.destroy()
      res.redirect('/admin/mercenaries')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController
