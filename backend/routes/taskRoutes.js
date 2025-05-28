const express = require('express');
const router = express.Router();
const { createTask, getTasks } = require('../controllers/taskController');

router.post('/tasks', createTask);
router.get('/tasks', getTasks);

module.exports = router;
