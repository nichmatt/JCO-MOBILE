const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
  typeDefs: itemTypeDefs,
  resolvers: itemResolvers,
} = require("./schemas/item");

const {
  typeDefs: categoryTypeDefs,
  resolvers: categoryResolvers,
} = require("./schemas/category");

const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schemas/user");

(async () => {
  const server = new ApolloServer({
    typeDefs: [itemTypeDefs, categoryTypeDefs, userTypeDefs],
    resolvers: [itemResolvers, categoryResolvers, userResolvers],
    introspection: true,
  });

  // Start Server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
