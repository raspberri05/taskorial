const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = async (request, response, next) => {
  try {
    const token = await request.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, process.env.RANDOM_TOKEN);
    const user = await decodedToken;
    request.user = user;
    next();
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
