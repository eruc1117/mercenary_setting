const { Mercenary, Property, Weapon } = require('../models')
const customize = require('../function/constructor')

const adminMercenaries = new customize.PageCss('adminMercenaries')

const adminController = {
  getMercenaries: async (req, res) => {
    try {
      const data = await Mercenary.findAll({
        attributes: [
          'id', 'name', 'propertyId', 'weaponId'
        ],
        raw: true,
        nest: true,
        include: [Property, Weapon]
      })
      res.render('admin/mercenaries', { data, cssStyle: adminMercenaries.css })
    } catch (err) {
      console.log(err)
    }
  },
  getMercenary: async (req, res) => {
    try {
      const id = req.params.id
      const data = await Mercenary.findByPk(
        id, {
          raw: true,
          nest: true,
          include: [Property, Weapon]
        })
      res.render('admin/mercenary', { data, cssStyle: adminMercenaries.css })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = adminController
