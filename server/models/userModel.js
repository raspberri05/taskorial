const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    minLength: 8
  },
  resetToken: {
    type: String,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
