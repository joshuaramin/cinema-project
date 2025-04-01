import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateUser_Roles: TypedDocumentNode = gql`
  mutation Create_user_role($name: String!, $description: String) {
    create_user_role(name: $name, description: $description) {
      ... on User_Role {
        user_role_id
        name
        description
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;

export const AddRemoveUserRolePermission: TypedDocumentNode = gql`
  mutation Add_remove_permission_user_role(
    $add: [String]!
    $removed: [String]!
    $userRoleId: ID!
  ) {
    add_remove_permission_user_role(
      add: $add
      removed: $removed
      user_role_id: $userRoleId
    ) {
      permission_id
      type
    }
  }
`;
