const express = require('express');
const { addTask } = require('../controllers/addTaskController');
const router = express.Router();

router.post('', addTask);

module.exports = router;