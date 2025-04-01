import { gql, TypedDocumentNode } from "@apollo/client";

export const CountrySubscription: TypedDocumentNode = gql`
  subscription Subscription {
    CountrySubscriptions {
      country_id
      country
      code
      created_at
      slug
      updated_at
    }
  }
`;
