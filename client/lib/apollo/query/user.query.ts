import { gql, TypedDocumentNode } from "@apollo/client";

export const GetUserById: TypedDocumentNode = gql`
  query GetUserById($userId: ID!) {
    getUserById(user_id: $userId) {
      user_id
      account_no
      profile {
        first_name
        last_name
      }
    }
  }
`;
