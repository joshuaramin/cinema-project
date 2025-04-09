import { gql, TypedDocumentNode } from "@apollo/client";

export const CountRecords: TypedDocumentNode = gql`
  query Query {
    countingRecords {
      users
      user_roles
    }
  }
`;
