const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Not Authorized" };

    const payload = verifyToken(access_token);
    if (!payload) throw { name: "Not Authorized" };

    const result = await User.findByPk(payload.id);
    if (!result) throw { name: "Not Authorized" };

    req.user = {
      id: result.id,
      username: result.username,
      email: result.email,
      role: result.role,
      //   phoneNumber: result.phoneNumber,
      //   address: result.address,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
