const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConnect = require("./dbConnect");
const rateLimit = require("express-rate-limit");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors"); // Import the cors middleware
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes"); // Import aiRoutes
const toggleRoutes = require("./routes/toggleRoutes");
const mailRoutes = require("./routes/mailRoutes");

require("dotenv").config();

dbConnect();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
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

const themeRoutes = require("./routes/themeRoutes");
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use(cors());
app.use("/tasks", taskRoutes);
app.use("/", authRoutes);
app.use("/ai", aiRoutes);
app.use("/toggle", toggleRoutes);
app.use("/", mailRoutes);
app.use("/theme", themeRoutes);
app.use('/api', userRoutes);

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

module.exports = app;
