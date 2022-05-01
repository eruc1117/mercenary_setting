const express = require('express')
const router = express.Router()
const mercenaryController = require('../../controller/admin/mercenaryController')
const bossController = require('../../controller/admin/bossController')

router.get('/mercenary/:id/edit', mercenaryController.editMercenary)
router.put('/mercenary/:id/edit', mercenaryController.putMercenary)
router.delete('/mercenary/:id', mercenaryController.deleteMercenary)
router.get('/mercenary/create', mercenaryController.createMercenary)
router.post('/mercenary/create', mercenaryController.postMercenary)
router.get('/mercenary/:id', mercenaryController.getMercenary)
router.get('/mercenaries', mercenaryController.getMercenaries)
router.put('/boss/:id/edit', bossController.putBoss)
router.get('/boss/:id/edit', bossController.editBoss)
router.get('/boss/:id', bossController.getBoss)
router.get('/bosses', bossController.getBosses)

module.exports = router
