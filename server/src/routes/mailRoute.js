const express = require("express");
const { sendResetMail , performReset} = require("../controllers/mailController");
const auth = require("../middleware/auth");

const router = express.Router();


router.post("/check", auth,performReset);
router.post("/reset",auth, sendResetMail);

module.exports = router;
