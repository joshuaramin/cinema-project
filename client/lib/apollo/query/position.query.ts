import { gql, TypedDocumentNode } from "@apollo/client";

export interface PositionInterface {
  position_id: string;
  position: string;
  created_at: any;
  user: any;
}

export const GetAllPosition: TypedDocumentNode = gql`
  query GetAllPosition($input: PaginationInput!, $search: String) {
    getAllPosition(input: $input, search: $search) {
      item {
        position_id
        position
        is_deleted
        description
        created_at
        slug
        updated_at
        user {
          profile {
            first_name
            last_name
          }
        }
      }
      currentPage
      hasNextPage
      hasPrevPage
      totalItems
      totalPages
    }
  }
`;

export const GetPosition: TypedDocumentNode = gql`
  query GetPositions($search: String) {
    getPositions(search: $search) {
      position_id
      position
    }
  }
`;
