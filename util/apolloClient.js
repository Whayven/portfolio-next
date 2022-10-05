import { ApolloClient, InMemoryCache } from "@apollo/client"; 
// Update the GraphQL endpoint to any instance of GraphQL that you like 
const GRAPHQL_URL = process.env.API_URL || "http://localhost:1337/graphql";

const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
});

export default client;