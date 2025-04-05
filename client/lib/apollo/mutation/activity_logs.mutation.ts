import { gql, TypedDocumentNode } from "@apollo/client";

export const Logout_Activity_Logs: TypedDocumentNode = gql`
  mutation Logout_activity_logs($userId: ID!) {
    logout_activity_logs(user_id: $userId) {
      title
      type
      description
      is_deleted
      created_at
      updated_at
    }
  }
`;
