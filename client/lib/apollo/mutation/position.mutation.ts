import { gql, TypedDocumentNode } from "@apollo/client";

export const Create_Position: TypedDocumentNode = gql`
  mutation Create_position($userId: ID!, $input: PositionInput) {
    create_position(user_id: $userId, input: $input) {
      ... on Position {
        position_id
        position
        is_deleted
        slug
        description
        created_at
        updated_at
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;

export const Update_Position: TypedDocumentNode = gql`
  mutation Update_position($positionId: ID!, $input: PositionInput) {
    update_position(position_id: $positionId, input: $input) {
      ... on Position {
        position_id
        position
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;

export const Delete_Position: TypedDocumentNode = gql`
  mutation Delete_position($positionId: ID!) {
    delete_position(position_id: $positionId) {
      ... on Position {
        position_id
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;
