const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConnect = require("./dbConnect");
const User = require("./models/userModel");
const Task = require("./models/taskModel");
const auth = require("./auth");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");
const { test, predictTime } = require("./gemini");
const { resetMail } = require("./mail");

require("dotenv").config();

dbConnect();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests",
});

function decodeToken(t) {
  const token = t.split(" ")[1];
  return JSON.parse(atob(token.split(".")[1])).userId;
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);

// free endpoint
app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

// register
app.post("/register", (request, response) => {
  if (request.body.password.length >= 8) {
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword) => {
        const user = new User({
          email: request.body.email,
          password: hashedPassword,
          resetToken: "empty",
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
});

// login
app.post("/login", (request, response) => {
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
});

// make task
app.post("/tasks", auth, (request, response) => {
  predictTime(request.body.name)
    .then((value) => {
      console.log(value.response.candidates[0].content.parts[0].text);
      const task = new Task({
        name: request.body.name,
        completed: request.body.completed,
        userId: request.body.userId,
        time: value.response.candidates[0].content.parts[0].text,
      });
      task
        .save()
        .then((result) => {
          response.status(201).send({
            message: "Task created successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Task creation failed",
            error,
          });
        });
    })
    .catch(() => {
      console.log("error");
    });
});

// get tasks
app.get("/tasks", auth, (request, response) => {
  const id = decodeToken(request.headers.authorization);
  Task.find({ userId: { $eq: id } })
    .then((result) => {
      response.status(200).send({
        message: "Task fetched successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Task fetching failed",
        error,
      });
    });
});

// complete task
app.put("/tasks", auth, (request, response) => {
  const id = decodeToken(request.headers.authorization);
  Task.findOne({ name: { $eq: request.body.name }, userId: { $eq: id } })
    .then((task) => {
      let comp = false;
      task.completed ? (comp = false) : (comp = true);

      Task.updateOne(
        { name: { $eq: request.body.name }, userId: { $eq: id } },
        { $set: { completed: comp } },
      )
        .then((result) => {
          response.status(200).send({
            message: "Task updated successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Task updating failed",
            error,
          });
        });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Task fetching failed",
        error,
      });
    });
});

// delete task
app.delete("/tasks", auth, (request, response) => {
  const id = decodeToken(request.headers.authorization);
  Task.deleteOne({ name: { $eq: request.body.name }, userId: { $eq: id } })
    .then((result) => {
      response.status(200).send({
        message: "Task deleted successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Task deletion failed",
        error,
      });
    });
});

// send email
app.post("/reset", (request, response) => {
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
});

// perform reset
app.post("/check", (request, response) => {
  User.findOne({ email: { $eq: request.body.sentEmail } })
    .then((result) => {
      if (result) {
        bcrypt
          .compare(request.body.code, result.resetToken)

          .then((passwordCheck) => {
            if (!passwordCheck) {
              return response.status(400).send({
                message: "Code comparison failed",
              });
            }
            bcrypt
              .hash(request.body.password, 10)
              .then((hashedPass) => {
                User.updateOne(
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
            return;
          })

          .catch((error) => {
            response.status(400).send({
              message: "Code comparison failed",
              error,
            });
          });
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
});

app.get("/ai", auth, (request, response) => {
  test()
    .then((result) => {
      response.status(200).send({
        message: "Task fetched successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Task fetching failed",
        error,
      });
    });
});

module.exports = app;
