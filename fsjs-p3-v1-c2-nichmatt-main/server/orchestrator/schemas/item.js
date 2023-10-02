const APP_URL = process.env.APP_URL || "http://localhost:4002";
const USER_URL = process.env.USER_URL || "http://localhost:4001";
const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis(
  14482,
  "redis://default:j5wkejECBkgeSI52abM5s9zofZc9e5X8@redis-14482.c84.us-east-1-2.ec2.cloud.redislabs.com:14482"
);

const typeDefs = `#graphql
    type Item {
    id: ID!
    name: String
    description: String
    price: Int
    imgUrl: String
    authorId: String
    categoryId: Int
    Category: Category
    user: User
    }

    type Category {
    id:ID!
    name: String
    }

    type User {
    _id: ID!
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  type deleteItem {
  message: String
  }

   type ItemPostResult {
    addItems:Item
    }

    type Query {
    getAllItems:[Item]
    getItem(id: ID!): Item 
    }
    type Mutation {
    postItem (
    name: String
    description: String
    price: Int
    imgUrl: String
    authorId: String
    categoryId: Int ): ItemPostResult
    deleteItem(
    id:Int
    ): deleteItem
    editItem(
    id:Int
    name: String
    description: String
    price: Int
    imgUrl: String
    authorId: String
    categoryId: Int 
    ingredients: [String]
    ): deleteItem
    }
`;

const resolvers = {
  Query: {
    getAllItems: async () => {
      let itemsCache = await redis.get("item:get");

      if (itemsCache) {
        let result = JSON.parse(itemsCache);
        return result;
      } else {
        const { data } = await axios.get(`${APP_URL}/items`);
        // console.log(data, "ini datanya");
        await redis.set("item:get", JSON.stringify(data));
        return data;
      }
    },

    getItem: async (_, args) => {
      const { data } = await axios.get(`${APP_URL}/items/${args.id}`);

      // hit data user based on AUTORID,
      const { data: user } = await axios.get(
        `${USER_URL}/users/${data.authorId}`
      );
      console.log(user, "ini  user datanya");

      data.user = user.users;
      console.log(data, "ini datanya");
      return data;
    },
  },

  Mutation: {
    postItem: async (
      _,
      { name, description, price, imgUrl, authorId, categoryId }
    ) => {
      console.log(name, description, price, imgUrl, authorId, categoryId, "<<");
      const { data } = await axios.post(`${APP_URL}/items`, {
        name,
        description,
        price,
        imgUrl,
        authorId,
        categoryId,
      });
      redis.del("item:get");
      console.log(data, "ini data dari postItem");
      return data;
    },
    deleteItem: async (_, { id }) => {
      const { data } = await axios.delete(`${APP_URL}/items/${id}`);
      redis.del("item:get");
      return data;
    },
    editItem: async (
      _,
      {
        id,
        name,
        description,
        price,
        imgUrl,
        authorId,
        categoryId,
        ingredients,
      }
    ) => {
      const { data } = await axios.put(`${APP_URL}/items/edit/${id}`, {
        name,
        description,
        price,
        imgUrl,
        authorId,
        categoryId,
        ingredients,
      });
      redis.del("item:get");
      return data;
    },
  },
};

module.exports = { typeDefs, resolvers };
