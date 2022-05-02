const express = require('express')
const router = express.Router()
const mercenaryController = require('../../controller/admin/mercenaryController')
const bossController = require('../../controller/admin/bossController')

router.get('/mercenary/:id/edit', mercenaryController.editMercenary)
router.put('/mercenary/:id/edit', mercenaryController.putMercenary)
router.delete('/mercenary/:id', mercenaryController.deleteMercenary)
router.get('/mercenary/create', mercenaryController.createMercenary)
router.post('/mercenary/create', mercenaryController.postMercenary)
router.delete('/boss/:id', bossController.deleteBoss)
router.get('/boss/create', bossController.createBoss)
router.post('/boss/create', bossController.postBoss)
router.put('/boss/:id/edit', bossController.putBoss)
router.get('/boss/:id/edit', bossController.editBoss)

module.exports = router
