const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConnect = require("./database/dbConnect");
const rateLimit = require("express-rate-limit");
const authRoute = require("./routes/authRoutes");
const taskRoute = require("./routes/taskRoutes");
const aiRoute = require("./routes/aiRoute");
const toggleRoute = require("./routes/toggleRoute");
const mailRoute = require("./routes/mailRoute");
const { testEndPoint } = require("./controllers/authController");
require("dotenv").config();

dbConnect();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests",
});

/**
 * Decode a JSON Web Token (JWT) and extract the user ID.
 * @param {string} t - The JWT string.
 * @returns {string} The user ID extracted from the JWT.
 */

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

app.get("/", testEndPoint);
app.use(authRoute);
app.use(mailRoute);
app.use("/tasks", taskRoute);
app.use("/toggle", toggleRoute);
app.use("/ai", aiRoute);

module.exports = app;
