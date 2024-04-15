const express = require("express");
const {
  fetchToggle,
  updateToggle,
} = require("../controllers/toggleController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);
router.get("/", fetchToggle);
router.put("/", updateToggle);

module.exports = router;
