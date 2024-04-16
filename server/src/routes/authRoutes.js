const express = require("express");
const router = express.Router();
const {getRegister, getLogin} = require("../controllers/authController");

// register
router.post("/register", getRegister);

// login
router.post("/login", getLogin);

module.exports = router;
