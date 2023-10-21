const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
// const { userUpdateSchema ,userUpdateSchema, validateUserId } = require('../valodators/userValidator');
const Auth = require('../middleware/Auth');
const JoiMid = require('./../middleware/JoiMid')
const userValidator = require('./../Joi/userValidator')
const isAdmin = require('../middleware/Admin');



// Get All Users
router.get('/', Auth, isAdmin, UserController.getAllUsers);

// Get User by  ID
router.get('/:id', Auth, UserController.getUserById);

// Create User
router.post('/', Auth, isAdmin, JoiMid.req(userValidator.userCreateSchema), UserController.createUser);

// Update User
router.put('/:id', Auth, JoiMid.req(userValidator.userUpdateSchema), UserController.updateUser);

// Delete User
router.delete('/:id', Auth, UserController.deleteUser);


//Verify
router.post('/verify', Auth,JoiMid.req(userValidator.verify_code), UserController.verifyUser);


module.exports = router;

