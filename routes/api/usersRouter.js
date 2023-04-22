// Import required modules
const express = require('express');
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/usersController');

// Initialize express router
const router = express.Router();

// User routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
