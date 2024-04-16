const express = require("express");
const router = express.Router();
const {sendEmail, checkEmail} = require("../controllers/mailController");

router.post("/reset", sendEmail);

// perform reset
router.post("/check", checkEmail);

module.exports = router;
