import { TypedDocumentNode, gql } from "@apollo/client";

export interface CountriesInterface {
  country_id: string;
  country: string;
  code: string;
  slug?: string;
  created_at: any;
}

export const GetAllCountries: TypedDocumentNode = gql`
  query GetAllCountries($input: PaginationInput!, $search: String) {
    getAllCountries(input: $input, search: $search) {
      item {
        country_id
        country
        code
        slug
        created_at
      }
      totalItems
      totalPages
      hasNextPage
      currentPage
      hasPrevPage
    }
  }
`;
