const { Boss, Fixattribute, Property, Skin } = require('../../models')
const customize = require('../../helpers/constructor')

const adminMercenaries = new customize.PageCss('adminMercenaries')
const adminMercenaryEdit = new customize.PageCss('adminMercenaryEdit')

const bossController = {
  getBosses: async (req, res, next) => {
    try {
      const rawData = await Boss.findAll({
        attributes: [
          'id'
        ],
        include:
          [{
            model: Fixattribute,
            attributes: ['name'],
            include: [{
              model: Property,
              attributes: ['name']
            }]
          }],
        nested: true,
        raw: true
      })
      if (!rawData) throw new Error('資料庫尚未建立資料！')
      const data = rawData.map(element => ({
        id: element.id,
        name: element['Fixattribute.name'],
        property: element['Fixattribute.Property.name']
      }))
      res.render('admin/bosses', { data, cssStyle: adminMercenaries.css })
    } catch (err) {
      next(err)
    }
  },
  getBoss: async (req, res, next) => {
    try {
      const id = req.params.id
      const rawData = await Boss.findByPk(
        id,
        {
          include: [{ all: true, include: { all: true } }],
          nested: true,
          raw: true
        })
      if (!rawData) throw new Error('王寵不存在！')
      const data = {
        name: rawData['Fixattribute.name'],
        image: rawData['Fixattribute.image'],
        property: rawData['Fixattribute.Property.name'],
        skin: rawData['Fixattribute.Skin.name'],
        attack: rawData.attack,
        range: rawData['Fixattribute.range']
      }
      res.render('admin/boss', { data, cssStyle: adminMercenaries.css })
    } catch (err) {
      next(err)
    }
  },
  editBoss: async (req, res, next) => {
    try {
      const id = req.params.id
      const skin = await Skin.findAll({ raw: true })
      const property = await Property.findAll({ raw: true })
      const rawData = await Boss.findByPk(
        id,
        {
          include: [{ all: true, include: { all: true } }],
          nested: true,
          raw: true
        })
      const data = {
        id: rawData.id,
        name: rawData['Fixattribute.name'],
        image: rawData['Fixattribute.image'],
        property: rawData['Fixattribute.propertyId'],
        skin: rawData['Fixattribute.Skin.id'],
        attack: rawData.attack,
        range: rawData['Fixattribute.range']
      }
      res.render('admin/bossEdit', {
        data,
        property,
        skin,
        cssStyle: adminMercenaryEdit.css
      })
    } catch (err) {
      next(err)
    }
  },
  putBoss: async (req, res, next) => {
    try {
      const {
        name,
        propertyId,
        skinId,
        attack,
        range,
        image
      } = req.body
      const boss = await Boss.findByPk(req.params.id)
      const emptyCheck = (element) => element === ''
      if (!boss) throw new Error('王寵不存在！')
      if (Object.values(req.body).some(emptyCheck)) throw new Error('不能輸入空值！')
      await boss.update({
        attack
      })
      const fixattributeId = boss.dataValues.fixattribute_id
      const fixattribute = await Fixattribute.findByPk(fixattributeId)
      await fixattribute.update({
        name,
        propertyId,
        skinId,
        range,
        image
      })
      req.flash('success_messages', '更新王寵資料成功！')
      res.redirect('/visitor/bosses')
    } catch (err) {
      next(err)
    }
  },
  createBoss: async (req, res, next) => {
    try {
      const property = await Property.findAll({
        raw: true
      })
      const skin = await Skin.findAll({
        raw: true
      })
      if (!property || !skin) throw new Error('資料庫出錯！')
      res.render('admin/bossCreate', {
        property,
        skin,
        cssStyle: adminMercenaryEdit.css
      })
    } catch (err) {
      next(err)
    }
  },
  postBoss: async (req, res, next) => {
    try {
      const property = await Property.findAll({
        raw: true
      })
      const skin = await Skin.findAll({
        raw: true
      })
      if (!property || !skin) throw new Error('資料庫出錯！')
      const {
        name,
        propertyId,
        skinId,
        attack,
        range,
        image
      } = req.body
      const boss = await Fixattribute.findOne({ where: { name } })
      const emptyCheck = (element) => element === ''
      if (boss) {
        req.flash('error_messages', '王寵已存在！')
        return res.redirect('back')
      }
      if (Object.values(req.body).some(emptyCheck)) throw new Error('不能輸入空值！')
      await Fixattribute.create({
        name,
        propertyId,
        skinId,
        range,
        image
      })
      const fixattribute = await Fixattribute.findOne({ where: { name }, raw: true })
      await Boss.create({
        fixattributeId: fixattribute.id,
        attack
      })
      req.flash('success_messages', '新增王寵資料成功！')
      res.redirect('/visitor/bosses')
    } catch (err) {
      next(err)
    }
  },
  deleteBoss: async (req, res, next) => {
    try {
      const data = await Boss.findByPk(req.params.id)
      if (!data) throw new Error('王寵不存在！')
      data.destroy()
      res.redirect('/visitor/bosses')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = bossController
