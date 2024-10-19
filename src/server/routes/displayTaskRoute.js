const express = require('express');
const router = express.Router();
const {displayTask } = require('../controllers/displayTaskController');

router.get('', displayTask);

module.exports = router;