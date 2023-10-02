const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

class User {
  static userCollection() {
    return getDatabase().collection("users");
  }

  static async findAll() {
    const users = await this.userCollection().find().toArray();

    return users;
  }

  static async findOne(id) {
    const user = await this.userCollection().findOne({
      _id: new ObjectId(id),
    });

    return user;
  }

  static async addUser(payload) {
    const user = await this.userCollection().insertOne(payload);

    const newUser = await this.userCollection().findOne({
      _id: new ObjectId(user.insertedId, { password: 0 }),
    });
    return newUser;
  }

  static async deleteUser(id) {
    const deleted = this.userCollection().deleteOne({
      _id: new ObjectId(id),
    });
    return deleted;
  }
}

module.exports = User;
