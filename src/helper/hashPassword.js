const bcrypt = require("bcrypt");
const saltRounds = 10;

/**
 * @param {string} password
 * hashing password
 */
async function hashingPassword(password) {
  return bcrypt.hashSync(password, saltRounds, (err, hash) => {
    return hash;
  });
}

/**
 * @param {string} password
 * @param {string} hash
 * Compare password with hash
 */
async function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { hashingPassword, comparePassword };
