import { gql, TypedDocumentNode } from "@apollo/client";

export const Create_Country: TypedDocumentNode = gql`
  mutation Create_country($input: CountryInput) {
    create_country(input: $input) {
      ... on country {
        country_id
        country
        code
        slug
        created_at
        updated_at
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;

export const Update_Country: TypedDocumentNode = gql`
  mutation Update_country($countryId: ID!, $input: CountryInput) {
    update_country(country_id: $countryId, input: $input) {
      ... on country {
        country_id
        country
        code
        slug
        created_at
        updated_at
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;

export const Delete_Country: TypedDocumentNode = gql`
  mutation Delete_country($countryId: ID!) {
    delete_country(country_id: $countryId) {
      country_id
      country
    }
  }
`;
