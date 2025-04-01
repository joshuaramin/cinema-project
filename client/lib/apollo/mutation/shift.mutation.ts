import { gql, TypedDocumentNode } from "@apollo/client";



export const Create_Shift: TypedDocumentNode = gql`
  mutation Create_shift($userId: ID!, $input: ShiftInput!) {
    create_shift(user_id: $userId, input: $input) {
      ... on ErrorObject {
        message
      }
      ... on Shift {
        shift_id
        type
      }
    }
  }
`;