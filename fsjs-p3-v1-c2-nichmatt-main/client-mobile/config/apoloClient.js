import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://aa45-27-50-29-117.ngrok-free.app/",
  cache: new InMemoryCache(),
});

export default client;
