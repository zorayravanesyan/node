const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const loginValid = require("../Joi/loginValidator");
const registerValid = require("../Joi/registrationValidator");
const JoiMid = require('./../middleware/JoiMid')

// Register User
router.post("/registration", JoiMid.req(registerValid.userRegistrationSchema), AuthController.register);

// Login User
router.post("/login", JoiMid.req(loginValid.userLoginSchema), AuthController.login);

module.exports = router;
