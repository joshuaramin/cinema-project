import { gql, TypedDocumentNode } from "@apollo/client";

export const GetAllGenere: TypedDocumentNode = gql`
  query getAllGenre($input: PaginationInput, $search: String) {
    getAllGenre(input: $input, search: $search) {
      item {
        genre_id
        name
      }
    }
  }
`;
