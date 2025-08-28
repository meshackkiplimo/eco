// lib/graphql/auth.ts
import { gql } from "@apollo/client";

export const REGISTER_CUSTOMER_MUTATION = gql`
  mutation RegisterCustomer($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input)
  }
`;

export const LOGIN_CUSTOMER_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ... on CurrentUser {
        id
        identifier
    }
    ... on InvalidCredentialsError {
        errorCode
        message
    }
    ... on NotVerifiedError {
        errorCode
        message
    }
  }
}
`;
