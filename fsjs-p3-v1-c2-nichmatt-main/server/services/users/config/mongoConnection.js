const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://nicholasofficial17:hAy8hmpWGydRlvBc@cluster0.ireglce.mongodb.net/";
const client = new MongoClient(url);
const dbName = "nico";
let db;

async function mongoConnect() {
  try {
    await client.connect();
    console.log("connected successfully");
    db = client.db(dbName);
    // console.log(db);
  } catch (error) {
    client.close();
    throw error;
  }
}

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  getDatabase,
};
