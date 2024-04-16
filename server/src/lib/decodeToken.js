/**
 * Decodes the user ID from the JWT token in the Authorization header.
 * @param {string} t - The token string.
 * @returns {string} The decoded user ID.
 */
function decodeToken(t) {
  const token = t.split(" ")[1];
  return JSON.parse(atob(token.split(".")[1])).userId;
}

module.exports = { decodeToken };
