import { gql } from "@apollo/client";

export const GET_USERS_DETAIL = gql`
  query GetUserId($id: ID!) {
    getUser(_id: $id) {
      _id
      address
      email
      phoneNumber
      role
      username
    }
  }
`;
