import { gql, TypedDocumentNode } from "@apollo/client";

export const CategorySubscriptions: TypedDocumentNode = gql`
  subscription Subscription {
    CategorySubscriptions {
      category_id
      category
      slug
      is_deleted
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
