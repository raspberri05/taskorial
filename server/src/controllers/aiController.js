const { test } = require("../lib/gemini");

/**
 * Function to fetch AI data and return an appropriate response
 * @param {*} request The HTTP request object
 * @param {*} response The HTTP response object
 */
const getAi = (request, response) => {
  test()
    .then((result) => {
      response.status(200).send({
        message: "ai fetched successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "ai fetching failed",
        error,
      });
    });
};

module.exports = { getAi };
