import { gql, TypedDocumentNode } from "@apollo/client";

export const Create_User_Account: TypedDocumentNode = gql`
  mutation Create_user_account(
    $input: UserInput!
    $address: AddressInput!
    $userRoleId: ID!
  ) {
    create_user_account(
      input: $input
      address: $address
      user_role_id: $userRoleId
    ) {
      ... on User {
        user_id
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;
