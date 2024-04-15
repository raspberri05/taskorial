const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/**
 * Registers a new user with encrypted password.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
const register = (request, response) => {
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

/**
 * Logs in a user with email and password.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
const login = (request, response) => {
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

/**
 * A test endpoint to check if the server is running.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 */
const testEndPoint = (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
};

module.exports = { login, register, testEndPoint };