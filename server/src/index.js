const http = require("http");
const app = require("./app");

/**
 * Attempts to convert the port into a valid port format, returns false if it fails
 * @param {string|number} val - The port to normalize
 * @returns {(number|string|boolean)} - Normalized port value
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "8080");
app.set("port", port);
const server = http.createServer(app);

/**
 * Handles server error, outputting the appropriate error message to the console
 * @param {Error} error - Error object
 * @throws {Error}
 */
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${address}` : `port ${port}`;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges.`);
      throw error;
    case "EADDRINUSE":
      console.error(`${bind} is already in use.`);
      throw error;
    default:
      throw error;
  }
};

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${address}` : `port ${port}`;
  console.log(`Listening on ${bind}`);
});

server.listen(port);
