import { gql } from 'apollo-server-koa';
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

export { typeDefs };
