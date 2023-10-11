const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { validateUser, validateUserId } = require('../valodators/userValidator');
const Auth = require('../middleware/Auth');

// Get All Users
router.get('/', Auth, UserController.getAllUsers);

// Get User by  ID
router.get('/:id', UserController.getUserById);

// Create User
router.post('/', validateUser, UserController.createUser);

// Update User
router.put('/:id', Auth, validateUserId, UserController.updateUser);

// Delete User
router.delete('/:id', Auth, validateUserId, UserController.deleteUser);

module.exports = router;

