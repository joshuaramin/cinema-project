import { gql, TypedDocumentNode } from "@apollo/client";

export const CountRecords: TypedDocumentNode = gql`
  query Query {
    countingRecords {
      country
      position
      users
      user_roles
      category
      group
      shift
    }
  }
`;
