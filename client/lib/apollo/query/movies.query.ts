import { gql, TypedDocumentNode } from "@apollo/client";

export interface MoviesInterface {
  movies_id?: string;
  name: string;
  url: string;
  duration: string;
  year: number;
  release_date: any;
  is_deleted?: boolean;
  created_at: any;
  description: string;
}

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


export const GetMoviesByIds: TypedDocumentNode = gql`
  query GetMoviesById($moviesId: ID!, $input: PaginationInput!) {
    getMoviesById(movies_id: $moviesId) {
      movies_id
      name
      description
      duration
      url
      release_date
      genre {
        name
      }
      year
      getAllRelatedMovies(input: $input) {
        item {
          name
          url
        }
      }
      created_at
      updated_at
    }
  }
`;