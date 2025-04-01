import { gql, TypedDocumentNode } from "@apollo/client";

export interface ShiftInterface {
  shift_id: string;
  type: string;
  user: {
    profile: {
      first_name: string;
      last_name: string;
    };
  };
  created_at: any;
}

export const GetAllShift: TypedDocumentNode = gql`
  query Query($input: PaginationInput!, $search: String) {
    getAllShift(input: $input, search: $search) {
      item {
        shift_id
        type
        user {
          profile {
            first_name
            last_name
          }
        }
        created_at
      }
      currentPage
      totalItems
      totalPages
      hasPrevPage
      hasNextPage
    }
  }
`;
