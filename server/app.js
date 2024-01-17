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

require("dotenv").config();

dbConnect();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests",
});

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
app.use(limiter)

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

app.post("/register", (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      user
        .save()
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
  User.findOne({ email: {$eq: request.body.email} })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
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
            process.env.RANDOM_TOKEN,
            { expiresIn: "24h" },
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
        });
    })
    .catch((e) => {
      response.status(404).send({
        messagea: "Email not found",
        e,
      });
    });
});

app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

app.post("/tasks", auth, (request, response) => {
  const task = new Task({
    name: request.body.name,
    completed: request.body.completed,
    userId: request.body.userId,
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
});

app.get("/tasks", auth, (request, response) => {
  token = request.headers.authorization.split(" ")[1];
  let id = JSON.parse(atob(token.split(".")[1])).userId;
  Task.find({ userId: {$eq: id} })
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
