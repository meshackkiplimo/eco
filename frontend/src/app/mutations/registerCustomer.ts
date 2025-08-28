import { gql } from "@apollo/client";

export const REGISTER_CUSTOMER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    registerCustomer(username: $username, email: $email, password: $password) {
      id
      username
      email
      token
    }
  }
`;
