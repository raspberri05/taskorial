const { test } = require("../lib/gemini");

/**
 * Fetches a task using the Gemini library.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
const fetchWithAI = (request, response) => {
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
};

module.exports = { fetchWithAI };
