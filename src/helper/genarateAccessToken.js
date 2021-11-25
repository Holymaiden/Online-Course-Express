const jwt = require("jsonwebtoken");

/**
 * @param {Object} data
 * create paginate
 */
async function genarateAccessToken(data) {
  return jwt.sign({ data }, process.env.TOKEN_SECRET, { expiresIn: "360d" });
}

module.exports = genarateAccessToken;
