import { gql, TypedDocumentNode } from "@apollo/client";

export const ShiftSubscription: TypedDocumentNode = gql`
  subscription ShiftSubscriptions {
    ShiftSubscriptions {
      shift_id
      type
      created_at
      updated_at
      user {
        profile {
          first_name
          last_name
        }
      }
    }
  }
`;
