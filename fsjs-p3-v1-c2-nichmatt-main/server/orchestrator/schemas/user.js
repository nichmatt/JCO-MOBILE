const USER_URL = process.env.USER_URL || "http://localhost:4001";
const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis(
  14482,
  "redis://default:j5wkejECBkgeSI52abM5s9zofZc9e5X8@redis-14482.c84.us-east-1-2.ec2.cloud.redislabs.com:14482"
);

const typeDefs = `#graphql
  type User {
    _id: ID!
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  type user {
  user:User
  }

  type deleteUser {
  message: String
  }

  type Query {
    getAllUser: [User]
    getUser(_id: ID!): User
  }

  type Mutation {
  postUser( 
    username:String  
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String): user
  deleteUser(
  id: String
  ): deleteUser
  }
`;

const resolvers = {
  Query: {
    getAllUser: async () => {
      let itemsCache = await redis.get("user:get");
      if (itemsCache) {
        let result = JSON.parse(itemsCache);
        return result;
      } else {
        const { data } = await axios.get(`${USER_URL}/users`);
        console.log(data, "ini user datanya");
        await redis.set("user:get", JSON.stringify(data));
        return data.users;
      }
    },

    getUser: async (_, args) => {
      const { data } = await axios.get(`${USER_URL}/users/${args._id}`);
      console.log(data, "ini  user datanya");
      return data.users; // Mengembalikan data pengguna tunggal, bukan array
    },
  },

  Mutation: {
    postUser: async (
      _,
      { username, email, password, role, phoneNumber, address }
    ) => {
      console.log(username, email, role, phoneNumber, address, "<<");
      const { data } = await axios.post(`${USER_URL}/users`, {
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      redis.del("user:get");

      console.log(data, "ini data dari postUser");
      return data;
    },
    deleteUser: async (_, { id }) => {
      const { data } = await axios.delete(`${USER_URL}/users/${id}`);
      redis.del("user:get");
      return data;
    },
  },
};

module.exports = { typeDefs, resolvers };
