const sortMercenaries = {
  rangeSortMer: async function (req, next) {
    try {
      const { Mercenary, Property, Weapon, Boss, User } = require('../models')
      const { Op } = require('sequelize')
      const bossId = req.params.id
      const bossRawData = await Boss.findByPk(
        bossId,
        {
          include: [{ all: true, include: { all: true } }],
          nested: true,
          raw: true
        })
      if (!bossRawData) throw new Error('王寵不存在！')
      const bossData = {
        id: bossRawData.id,
        name: bossRawData['Fixattribute.name'],
        image: bossRawData['Fixattribute.image'],
        property: bossRawData['Fixattribute.Property.name'],
        skin: bossRawData['Fixattribute.Skin.name'],
        attack: bossRawData.attack,
        range: bossRawData['Fixattribute.range']
      }
      const property = await Property.findAll({ raw: true })
      const propertyId = req.body.propertyId
      const myMercenary = req.body.myMercenary
      if (!propertyId && !myMercenary) { // 以全部傭兵進行分類
        const inMercenariesRaw = await Mercenary.findAll({
          where: {
            range: {
              [Op.lte]: Number(bossData.range)
            }
          },
          include: {
            model: Weapon
          },
          raw: true,
          nest: true
        })
        const outMercenariesRaw = await Mercenary.findAll({
          where: {
            range: {
              [Op.gt]: Number(bossData.range)
            }
          },
          include: {
            model: Weapon
          },
          raw: true,
          nest: true
        })
        const outMercenaries = outMercenariesRaw.map(element => ({
          id: element.id,
          name: element.name,
          weapon: element.Weapon.name
        }))
        const inMercenaries = inMercenariesRaw.map(element => ({
          id: element.id,
          name: element.name,
          weapon: element.Weapon.name
        }))
        if (!bossRawData || !property || !inMercenaries || !outMercenaries) throw new Error('資料庫尚未建立資料！')
        return [bossData, property, inMercenaries, outMercenaries]
      }
      if (propertyId && !myMercenary) { // 以特定屬性傭兵進行分類
        const inMercenariesRaw = await Mercenary.findAll({
          where: {
            propertyId,
            range: {
              [Op.lte]: Number(bossData.range)
            }
          },
          include: {
            model: Weapon
          },
          raw: true,
          nest: true
        })
        const outMercenariesRaw = await Mercenary.findAll({
          where: {
            propertyId,
            range: {
              [Op.gt]: Number(bossData.range)
            }
          },
          include: {
            model: Weapon
          },
          raw: true,
          nest: true
        })
        const outMercenaries = outMercenariesRaw.map(element => ({
          id: element.id,
          name: element.name,
          weapon: element.Weapon.name
        }))
        const inMercenaries = inMercenariesRaw.map(element => ({
          id: element.id,
          name: element.name,
          weapon: element.Weapon.name
        }))
        if (!bossRawData || !property || !inMercenaries || !outMercenaries) throw new Error('資料庫尚未建立資料！')
        return [bossData, property, inMercenaries, outMercenaries]
      }
      if ((!propertyId && !myMercenary)) {
        const inMercenariesRaw = await Mercenary.findAll({
          where: {
            range: {
              [Op.lte]: Number(bossData.range)
            }
          },
          include: {
            model: Weapon
          },
          raw: true,
          nest: true
        })
        const outMercenariesRaw = await Mercenary.findAll({
          where: {
            range: {
              [Op.gt]: Number(bossData.range)
            }
          },
          include: {
            model: Weapon
          },
          raw: true,
          nest: true
        })
        const outMercenaries = outMercenariesRaw.map(element => ({
          id: element.id,
          name: element.name,
          weapon: element.Weapon.name
        }))
        const inMercenaries = inMercenariesRaw.map(element => ({
          id: element.id,
          name: element.name,
          weapon: element.Weapon.name
        }))
        if (!bossRawData || !property || !inMercenaries || !outMercenaries) throw new Error('資料庫尚未建立資料！')
        return [bossData, property, inMercenaries, outMercenaries]
      }
      if (!propertyId && myMercenary) { // 以使用者擁有的傭兵進行分類
        const inMercenariesRaw = await Mercenary.findAll({
          where: {
            range: {
              [Op.lte]: Number(bossData.range)
            }
          },
          include: [{
            model: Weapon
          }, {
            model: User,
            as: 'UserMercenaryMercenary',
            where: { id: req.user.id }
          }],
          raw: true,
          nest: true
        })
        const outMercenariesRaw = await Mercenary.findAll({
          where: {
            range: {
              [Op.gt]: Number(bossData.range)
            }
          },
          include: [{
            model: Weapon
          }, {
            model: User,
            as: 'UserMercenaryMercenary',
            where: { id: req.user.id }
          }],
          raw: true,
          nest: true
        })
        const outMercenaries = outMercenariesRaw.map(element => ({
          id: element.id,
          name: element.name,
          weapon: element.Weapon.name
        }))
        const inMercenaries = inMercenariesRaw.map(element => ({
          id: element.id,
          name: element.name,
          weapon: element.Weapon.name
        }))
        if (!bossRawData || !property || !inMercenaries || !outMercenaries) throw new Error('資料庫尚未建立資料！')
        return [bossData, property, inMercenaries, outMercenaries]
      }
      if (propertyId && myMercenary) { // 以使用者擁有特定屬性傭兵進行分類
        const inMercenariesRaw = await Mercenary.findAll({
          where: {
            propertyId,
            range: {
              [Op.lte]: Number(bossData.range)
            }
          },
          include: [{
            model: Weapon
          }, {
            model: User,
            as: 'UserMercenaryMercenary',
            where: { id: req.user.id }
          }],
          raw: true,
          nest: true
        })
        const outMercenariesRaw = await Mercenary.findAll({
          where: {
            propertyId,
            range: {
              [Op.gt]: Number(bossData.range)
            }
          },
          include: [{
            model: Weapon
          }, {
            model: User,
            as: 'UserMercenaryMercenary',
            where: { id: req.user.id }
          }],
          raw: true,
          nest: true
        })
        const outMercenaries = outMercenariesRaw.map(element => ({
          id: element.id,
          name: element.name,
          weapon: element.Weapon.name
        }))
        const inMercenaries = inMercenariesRaw.map(element => ({
          id: element.id,
          name: element.name,
          weapon: element.Weapon.name
        }))
        if (!bossRawData || !property || !inMercenaries || !outMercenaries) throw new Error('資料庫尚未建立資料！')
        return [bossData, property, inMercenaries, outMercenaries]
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = sortMercenaries
