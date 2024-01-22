const express = require('express');
const router = express.Router();

const DashboardController = require('../Controller/DashboardController');

router.get('/', DashboardController.index);

module.exports = router;
