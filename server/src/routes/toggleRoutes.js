const express = require("express");
const router = express.Router();
const {
    getToggle,
    updateToggle,
} = require("../controllers/toggleController");

router.put("/", updateToggle);

router.get("/", getToggle);

module.exports = router;
