const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { decodeToken } = require("../lib/decodeToken");
const { ObjectId } = require("mongodb");
const Task = require("../models/taskModel");
// register
const getRegister = (request, response) => {
  if (request.body.password.length >= 8) {
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword) => {
        const user = new User({
          email: request.body.email,
          password: hashedPassword,
          resetToken: "empty",
          toggle: true,
          displayName: request.body.displayName,
          theme: "dark"
        });

        user
          .save()
          .then((result) => {
            response.status(201).send({
              message: "User creation successful",
              result,
            });
          })
          .catch((error) => {
            response.status(500).send({
              message: "User sign up failed",
              error,
            });
          });
      })
      .catch((e) => {
        response.status(500).send({
          message: "Password encryption failed",
          e,
        });
      });
  } else {
    response.status(400).send({
      message: "Password too short",
    });
  }
};

// login
const getLogin = (request, response) => {
  User.findOne({ email: { $eq: request.body.email } })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Password comparison failed",
            });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
              displayName: user.displayName,
            },
            process.env.RANDOM_TOKEN,
            { expiresIn: "24h" },
          );

          return response.status(200).send({
            message: "Login successful",
            email: user.email,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Password comparison failed",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
};

const deleteAccount = (request, response) => {
  const id = decodeToken(request.headers.authorization);
  User.deleteOne({ _id: new ObjectId(id) })
    .then(() => {
      // Optionally, you can also delete associated tasks
      Task.deleteMany({ userId: { $eq: id } })
        .then(() => {
          response.status(200).send({
            message: "Account deleted successfully",
          });
        })
        .catch((taskError) => {
          console.error("Error deleting associated tasks:", taskError);
          response.status(500).send({
            message: "Error deleting associated tasks",
          });
        });
    })
    .catch((error) => {
      console.error("Error deleting account:", error);
      response.status(500).send({
        message: "Error deleting account (server)",
      });
    });
};

module.exports = { getRegister, getLogin, deleteAccount };
