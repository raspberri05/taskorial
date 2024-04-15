const { test } = require("../lib/gemini");
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
