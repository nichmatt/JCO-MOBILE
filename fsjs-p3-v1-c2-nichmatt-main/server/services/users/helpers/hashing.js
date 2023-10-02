const bcrypt = require("bcrypt");

function hashingPassword(password) {
  const salt = bcrypt.genSaltSync(8);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { comparePassword, hashingPassword };
