const express = require('express');
const router = express.Router();
const updateTask = require ('../controllers/updateTaskController');

router.put('/:id', updateTask.updateTask);

module.exports = router;    
