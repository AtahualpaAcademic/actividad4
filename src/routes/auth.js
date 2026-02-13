const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Cuando alguien mande datos a /api/auth/register
router.post('/register', authController.register);

// Cuando alguien mande datos a /api/auth/login
router.post('/login', authController.login);

module.exports = router;