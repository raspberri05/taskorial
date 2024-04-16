const express = require("express");
const router = express.Router();
const {
  getRegister,
  getLogin,
  deleteAccount,
} = require("../controllers/authController");

// register
router.post("/register", getRegister);

// login
router.post("/login", getLogin);

router.delete("/delete", deleteAccount);

module.exports = router;
