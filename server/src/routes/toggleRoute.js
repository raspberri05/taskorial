const express = require("express");
const {
  fetchToggle,
  updateToggle,
} = require("../controllers/toggleController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/",auth, fetchToggle);
router.put("/",auth, updateToggle);

module.exports = router;
