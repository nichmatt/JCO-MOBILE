const { hashingPassword } = require("../helpers/hashing");
const User = require("../model/user");

class Controller {
  static async findAllUsers(req, res, next) {
    try {
      const users = await User.findAll();

      res.status(200).json({ users });
    } catch (error) {}
  }

  static async createUser(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      const newPassword = hashingPassword(password);

      const newUser = await User.addUser({
        username,
        email,
        password: newPassword,
        role: role || "admin",
        phoneNumber: phoneNumber || "",
        address: address || "",
      });
      delete newUser.password;

      res.status(201).json({ user: newUser });
    } catch (error) {
      console.log(error);
    }
  }

  static async findOneUsers(req, res, next) {
    try {
      const { id } = req.params;
      const users = await User.findOne(id);

      res.status(200).json({ users });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      console.log(id, "ini id di req.params delete user");

      const deleted = await User.deleteUser(id);

      res.status(200).json({ message: "user with id " + id + " was deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { Controller };
