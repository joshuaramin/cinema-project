import { gql, TypedDocumentNode } from "@apollo/client";

export interface CategoryInterface {
  category_id: string;
  category: string;
  slug: string;
  is_deleted: boolean;
  created_at: any;
  user: any;
}

export const GetAllCategories: TypedDocumentNode = gql`
  query GetAllCategories($input: PaginationInput, $search: String) {
    getAllCategories(input: $input, search: $search) {
      item {
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
      hasPrevPage
      hasNextPage
      currentPage
      totalItems
      totalPages
    }
  }
`;

export const GetCategories: TypedDocumentNode = gql`
  query GetCategories($search: String!) {
    getCategories(search: $search) {
      category_id
      category
    }
  }
`;
