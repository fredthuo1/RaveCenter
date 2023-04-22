// Import required modules
const express = require('express');
const {
    register,
    login
} = require('../controllers/authController');

// Initialize express router
const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;

