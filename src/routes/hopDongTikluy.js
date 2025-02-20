const express = require('express');
const HopDongController = require('../controllers/HopDongController');
const router = express.Router()

router.post('/hopDongHTDT/kyHopDong', HopDongController.kyHDHTDTTikluy);

module.exports = router;