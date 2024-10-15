// routes/auth.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth'); // Optional: If you have routes that require authentication

// Route for user registration
router.post('/register', UserController.register);

// Route for user login
router.post('/login', UserController.login);

// Optional: Protected route to get user profile (requires authentication)
router.get('/profile', authMiddleware, UserController.getProfile);

module.exports = router;
