const express = require('express')
const SensorController = require('../controllers/SensorController')
const router = express.Router()

router.get('/', SensorController.index)
router.post('/show', SensorController.show)
router.post('/store', SensorController.store)
router.post('/update', SensorController.update)
router.post('/delete', SensorController.destroy)

module.exports = router