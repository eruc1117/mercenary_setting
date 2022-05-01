const { Boss, Fixattribute, Property } = require('../../models')
const customize = require('../../helpers/constructor')

const adminMercenaries = new customize.PageCss('adminMercenaries')

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
  }
}

module.exports = bossController
