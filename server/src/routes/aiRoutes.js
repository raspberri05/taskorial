const express = require("express");
const router = express.Router();
const {getAi} = require("../controllers/aiController");

router.get("/", getAi);

module.exports = router;
