const express = require("express");
const {
  createTask,
  deleteTask,
  completTask,
  getTask,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");

const router = express.Router();


router.get("/", auth, getTask);
router.post("/", auth, createTask);
router.put("/", auth, completTask);
router.delete("/", auth, deleteTask);

module.exports = router;
