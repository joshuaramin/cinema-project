import { gql, TypedDocumentNode } from "@apollo/client";

export const LoginMutation: TypedDocumentNode = gql`
  mutation Login($input: AuthInput) {
    login(input: $input) {
      ... on token {
        user {
          user_id
          account_no
          email
          profile {
            first_name
            last_name
          }
          user_role {
            permission {
              type
            }
          }
        }
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;
