const APP_URL = process.env.APP_URL || "http://localhost:4002";
const axios = require("axios");

const typeDefs = `#graphql
    type Category {
    id: ID!
    name: String
    }

    type CategoryPostResult {
    statusCode: Int
    message: String
    }
    type Query {
    getAllCategory:[Category]
    }
    type Mutation {
    postCategory (
    name: String
   ): CategoryPostResult
    }
`;

const resolvers = {
  Query: {
    getAllCategory: async () => {
      const { data } = await axios.get(`${APP_URL}/categories`);
      // console.log(data);
      return data;
    },
  },
};

module.exports = { typeDefs, resolvers };
