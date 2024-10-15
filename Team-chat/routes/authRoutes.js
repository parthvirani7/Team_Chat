const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/admin', authMiddleware, roleMiddleware(['Admin']), (req, res) => {
  res.status(200).json({ message: 'Admin access' });
});

module.exports = router;
