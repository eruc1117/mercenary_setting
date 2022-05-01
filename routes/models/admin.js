const express = require('express')
const router = express.Router()
const adminController = require('../../controller/adminController')

router.get('/mercenary/:id/edit', adminController.editMercenary)
router.put('/mercenary/:id/edit', adminController.putMercenary)
router.get('/mercenary/:id', adminController.getMercenary)
router.get('/mercenaries', adminController.getMercenaries)

module.exports = router
