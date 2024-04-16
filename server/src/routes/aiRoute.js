const express = require("express");
const { fetchWithAI } = require("../controllers/aiController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, fetchWithAI);

module.exports = router;
