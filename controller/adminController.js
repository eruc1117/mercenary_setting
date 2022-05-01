const { Mercenary, Property, Weapon } = require('../models')
const customize = require('../function/constructor')

const adminIndex = new customize.PageCss('adminIndex')

const adminController = {
  getMercenary: async (req, res) => {
    try {
      const data = await Mercenary.findAll({
        attributes: [
          'id', 'name', 'propertyId', 'weaponId'
        ],
        raw: true,
        nest: true,
        include: [Property, Weapon]
      })
      res.render('admin/index', { data, cssStyle: adminIndex.css })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = adminController
