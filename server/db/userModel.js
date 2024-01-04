const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: [true, "Email address already exists"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
