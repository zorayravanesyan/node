const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Register User
router.post('/register', AuthController.register);

// Login User
router.post('/login', AuthController.login);

module.exports = router;
