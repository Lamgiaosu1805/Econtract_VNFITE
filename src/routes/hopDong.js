const express = require('express');
const HopDongController = require('../controllers/HopDongController');
const router = express.Router()

// router.get('/getToken', HopDongController.getTokenVNPT);
router.get('/testKyHopDong', HopDongController.testKyHopDong);

module.exports = router;