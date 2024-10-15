const express = require('express');
const { getChatMessages } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:roomId', authMiddleware, getChatMessages);

module.exports = router;
