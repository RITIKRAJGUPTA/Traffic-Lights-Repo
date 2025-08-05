// routes/trafficRoutes.js

const express = require('express');
const router = express.Router();
const { getTrafficStatus } = require('../controller/trafficController');

router.get('/traffic-status', getTrafficStatus);

module.exports = router;
