import { gql, TypedDocumentNode } from "@apollo/client";

export const CREATE_MOVIES: TypedDocumentNode = gql`
  mutation Create_movies($file: Upload, $genreId: [ID!]!, $input: MoviesInput) {
    create_movies(file: $file, genre_id: $genreId, input: $input) {
      ... on Movies {
        movies_id
        name
        description
        year
        duration
        url
        is_deleted
        created_at
        updated_at
        totalGenre
        genre {
          genre_id
          name
        }
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;
