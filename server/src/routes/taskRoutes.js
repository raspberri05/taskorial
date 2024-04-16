const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/", createTask);

// get tasks
router.get("/", getTasks);

// complete task
router.put("/", updateTask);

// delete task
router.delete("/", deleteTask);

module.exports = router;
