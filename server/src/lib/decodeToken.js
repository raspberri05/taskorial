function decodeToken(t) {
  const token = t.split(" ")[1];
  return JSON.parse(atob(token.split(".")[1])).userId;
}
module.exports = { decodeToken };
