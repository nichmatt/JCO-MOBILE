import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    getAllItems {
      id
      name
      imgUrl
      price
      description
      categoryId
      authorId
      Category {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCTS_DETAIL = gql`
  query GetItem($id: ID!) {
    getItem(id: $id) {
      authorId
      categoryId
      description
      id
      imgUrl
      name
      price
      user {
        username
        role
        phoneNumber
        email
        address
        _id
      }
      Category {
        name
        id
      }
    }
  }
`;
