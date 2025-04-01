import { gql, TypedDocumentNode } from "@apollo/client";

export const Create_Blog_Post: TypedDocumentNode = gql`
  mutation Create_blog_post(
    $userId: ID!
    $categoryId: ID!
    $input: BlogPostInput
  ) {
    create_blog_post(
      user_id: $userId
      category_id: $categoryId
      input: $input
    ) {
      ... on BlogPost {
        blog_post_id
        title
        description
        excerpt
        slug
        is_deleted
        image
        created_at
        updated_at
        categories {
          category_id
          category
        }
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;
