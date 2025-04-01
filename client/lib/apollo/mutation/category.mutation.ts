import { gql, TypedDocumentNode } from "@apollo/client";

export const Create_Category: TypedDocumentNode = gql`
  mutation Create_category($input: CategoryInput!, $userId: ID!) {
    create_category(input: $input, user_id: $userId) {
      ... on Category {
        category_id
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;

export const Update_Category: TypedDocumentNode = gql`
  mutation Update_category($input: CategoryInput!, $categoryId: ID!) {
    update_category(input: $input, category_id: $categoryId) {
      ... on Category {
        category_id
        category
        created_at
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;

export const Delete_Category: TypedDocumentNode = gql`
  mutation Delete_category($categoryId: ID!) {
    delete_category(category_id: $categoryId) {
      category_id
      category
    }
  }
`;
