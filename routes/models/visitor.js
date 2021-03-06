const express = require('express')
const router = express.Router()
const mercenaryController = require('../../controller/admin/mercenaryController')
const bossController = require('../../controller/admin/bossController')
const userController = require('../../controller/userController')

router.get('/mercenary/:id', mercenaryController.getMercenary)
router.post('/mercenaries/sort', mercenaryController.sortMercenaries)
router.get('/mercenaries', mercenaryController.getMercenaries)
router.post('/bosses/sort', bossController.sortBosses)
router.get('/boss/:id', bossController.getBoss)
router.get('/bosses', bossController.getBosses)
router.post('/group/mercenaries/sort/:id', userController.group)
router.get('/group/boss/:id', userController.group)

module.exports = router
