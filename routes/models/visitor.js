const express = require('express')
const router = express.Router()
const mercenaryController = require('../../controller/admin/mercenaryController')
const bossController = require('../../controller/admin/bossController')

router.get('/mercenary/:id', mercenaryController.getMercenary)
router.get('/mercenaries', mercenaryController.getMercenaries)
router.get('/boss/:id', bossController.getBoss)
router.get('/bosses', bossController.getBosses)

module.exports = router
