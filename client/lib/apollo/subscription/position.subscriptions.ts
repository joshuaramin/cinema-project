import { TypedDocumentNode, gql } from "@apollo/client";

export const PositionSubscription: TypedDocumentNode = gql`
  subscription Subscription {
    PositionSubscriptions {
      position_id
      slug
      position
      description
      is_deleted
      updated_at
      created_at
      user {
        profile {
          first_name
          last_name
        }
      }
    }
  }
`;
