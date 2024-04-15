const express = require("express");
const { fetchWithAI } = require("../controllers/aiController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);
router.get("/", fetchWithAI);

module.exports = router;
