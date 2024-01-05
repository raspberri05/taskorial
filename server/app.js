const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const Task = require("./db/taskModel");
const auth = require("./auth");


dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


// body parser configuration
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

app.post("/register", (request, response) => {
  bcrypt.hash(request.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        email: request.body.email,
        password: hashedPassword
      });

      user.save()
        .then((result) => {
          response.status(201).send({
            message: "User created successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "User creation failed",
            error,
          });
        });

    })
    .catch((e) => {
      response.status(500).send({
        message: "Password hashing failed",
        e,
      });
    });
});

app.post("/login", (request, response) => {
  User.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt.compare(request.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Password comparison failed",
              error,
            });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          response.status(200).send({
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
        })
    })
    .catch((e) => {
      response.status(404).send({
        messagea: "Email not found",
        e,
      });
    });
})

app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

app.post("/tasks", auth, (request, response) => {
  console.log("hi", request.body);
  const task = new Task({
    name: request.body.name,
    completed: request.body.completed,
    userId: request.body.userId,
  });
  task.save()
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
});

module.exports = app;
