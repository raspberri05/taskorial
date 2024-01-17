const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  try {
    const token = await request.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
    const user = await decodedToken;
    request.user = user;
    next();
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
