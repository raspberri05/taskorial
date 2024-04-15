const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { resetMail } = require("../lib/mail");

/**
 * Sends a reset email with a code to the user's email address.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
const sendResetMail = (request, response) => {
  const email = request.body.email;

  User.findOne({ email: { $eq: request.body.email } })
    .then((result) => {
      if (result) {
        const newToken = crypto.randomBytes(32).toString("hex");
        bcrypt
          .hash(newToken, 10)
          .then((hashed) => {
            User.updateOne(
              { email: { $eq: email } },
              { $set: { resetToken: hashed } },
            )
              .then(() => {
                response.status(200).send({
                  message: "Code successfully generated",
                  email,
                });
              })
              .catch((error) => {
                response.status(500).send({
                  message: "Code generation failed",
                  error,
                });
              });
          })
          .catch((error) => {
            response.status(500).send({
              message: "Code hashing failed",
              error,
            });
          });

        //const mailInfo = mailData(request.body.email, newToken)

        /* TRANSPORTER.sendMail(mailInfo, (error) => {
          if (error) {
            console.log(error);
          }
          response.status(200).send({
            message: "Email sent successfully",
          });
        });*/
        resetMail(request.body.email, newToken);
      } else {
        response.status(404).send({
          message: "Email not found",
        });
      }
    })
    .catch((error) => {
      response.status(500).send({
        message: "Email search failed",
        error,
      });
    });
};


/**
 * Performs the password reset for a user.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
const performReset = (request, response) => {
  User.findOne({ email: { $eq: request.body.sentEmail } })
    .then((result) => {
      if (result) {
        return bcrypt
          .compare(request.body.code, result.resetToken)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return response.status(400).send({
                message: "Code comparison failed",
              });
            }
            return bcrypt
              .hash(request.body.password, 10)
              .then((hashedPass) => {
                return User.updateOne(
                  { email: { $eq: request.body.sentEmail } },
                  { $set: { resetToken: "empty", password: hashedPass } },
                )
                  .then((r) => {
                    return response.status(200).send({
                      message: "Password updated successfully",
                      r,
                    });
                  })
                  .catch((error) => {
                    return response.status(500).send({
                      message: "Password update failed",
                      error,
                    });
                  });
              })
              .catch((error) => {
                return response.status(500).send({
                  message: "Password hashing failed",
                  error,
                });
              });
          })
          .catch((error) => {
            return response.status(400).send({
              message: "Code comparison failed",
              error,
            });
          });
      } else {
        return response.status(404).send({
          message: "Email not found",
        });
      }
    })
    .catch((error) => {
      return response.status(500).send({
        message: "Email search failed",
        error,
      });
    });
};

module.exports = { sendResetMail , performReset }