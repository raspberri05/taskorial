const express = require("express");
const {
  createTask,
  deleteTask,
  completTask,
  getTask,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);
router.get("/", getTask);
router.post("/", createTask);
router.put("/", completTask);
router.delete("/", deleteTask);

module.exports = router;
