const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a task"],
    unique: false,
  },

  completed: {
    type: Boolean,
    required: [true, "Please provide a completion status"],
    unique: false,
  },

  userId: {
    type: String,
    required: [true, "Please provide a user"],
    unique: true,
  },
});

module.exports = mongoose.model.Tasks || mongoose.model("Tasks", TaskSchema);