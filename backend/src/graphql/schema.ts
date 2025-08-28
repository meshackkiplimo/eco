import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Customer {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Query {
    customers: [Customer!]!
  }

  type Mutation {
    createCustomer(firstName: String!, lastName: String!, email: String!): Customer!
  }
`;
