/**
 * Updates the toggle status for a user.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
const updateToggle = (request, response) => {
  const id = decodeToken(request.headers.authorization);
  User.findOne({ _id: { $eq: id } })
    .then((user) => {
      let yes = false;
      user.toggle ? (yes = false) : (yes = true);

      User.updateOne({ _id: { $eq: id } }, { $set: { toggle: yes } })
        .then((result) => {
          response.status(200).send({
            message: "Toggle updated successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Toggle updating failed",
            error,
          });
        });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Toggle fetching failed",
        error,
      });
    });
};

/**
 * Fetches the toggle status for a user.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
const fetchToggle = (request, response) => {
  const id = decodeToken(request.headers.authorization);
  User.findOne({ _id: { $eq: id } })
    .then((result) => {
      response.status(200).send({
        message: "Toggle fetched successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Toggle fetching failed",
        error,
      });
    });
};

module.exports = { fetchToggle, updateToggle };
