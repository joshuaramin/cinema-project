import { gql, TypedDocumentNode } from "@apollo/client";

export const GetAllMovies: TypedDocumentNode = gql`
  query GetAllMovies($input: PaginationInput, $search: String) {
    getAllMovies(input: $input, search: $search) {
      item {
        movies_id
        name
        description
        url
        duration
        year
        release_date
        is_deleted
        created_at
        updated_at
      }
      totalItems
      totalPages
      currentPage
      hasNextPage
      hasPrevPage
    }
  }
`;
