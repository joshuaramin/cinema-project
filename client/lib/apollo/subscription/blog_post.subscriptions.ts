import { gql, TypedDocumentNode } from "@apollo/client";

export const BlogPostSubscriptions: TypedDocumentNode = gql`
  subscription Subscription {
    BlogPostSubscriptions {
      blog_post_id
      title
      slug
      description
      tags
      excerpt
      image
      is_deleted
      created_at
      updated_at
      categories {
        category_id
        category
      }
      user {
        profile {
          first_name
          last_name
        }
      }
    }
  }
`;
