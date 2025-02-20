const express = require('express');
const HopDongController = require('../controllers/HopDongController');
const router = express.Router()

// router.get('/getToken', HopDongController.getTokenVNPT);
router.post('/testKyHopDong', HopDongController.testKyHopDong);

module.exports = router;