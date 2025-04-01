import { gql, TypedDocumentNode } from "@apollo/client";

export const Create_Event: TypedDocumentNode = gql`
  mutation Mutation($userId: ID!, $input: EventsInput) {
    create_events(user_id: $userId, input: $input) {
      ... on Events {
        events_id
        title
        slug
        location
        description
        startDate
        endDate
        is_deleted
        created_at
        updated_at
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;
