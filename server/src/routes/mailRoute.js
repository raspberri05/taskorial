const express = require("express");
const { sendResetMail , performReset} = require("../controllers/mailController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);
router.post("/check", performReset);
router.post("/reset", sendResetMail);

module.exports = router;
