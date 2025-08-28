import { gql } from "graphql-tag";

const typeDefs = gql`
  type Customer {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Query {
    me: Customer
  }

  type Mutation {
    registerCustomer(username: String!, email: String!, password: String!): Customer
    login(email: String!, password: String!): Customer
  }
`;

export default typeDefs;
