const express = require("express");
const router = express.Router();
const { updateTheme } = require("../controllers/themeController");

router.patch("/theme", updateTheme);

module.exports = router;