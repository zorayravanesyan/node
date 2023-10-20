const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const verified = require("../middleware/verified");

// Register User
router.post("/registration" , AuthController.register);

// Login User
router.post("/login", verified, AuthController.login);

module.exports = router;
