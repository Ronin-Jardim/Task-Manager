const express = require('express');
const router = express.Router();
const deleteTask = require ('../controllers/deleteTaskController');

router.delete('/:id', deleteTask.deleteTask);

module.exports = router;