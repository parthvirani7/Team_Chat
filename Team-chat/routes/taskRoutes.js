const express = require('express');
const { createTask, updateTask, deleteTask, getTasks } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['Admin']), createTask);

router.put('/:taskId', authMiddleware, roleMiddleware(['Admin', 'User']), updateTask);

router.delete('/:taskId', authMiddleware, roleMiddleware(['Admin']), deleteTask);

router.get('/', authMiddleware, getTasks);

module.exports = router;
