import { gql, TypedDocumentNode } from "@apollo/client";

export interface RoleInterface {
  user_role_id: string;
  name: string;
  slug: string;
  user: [];
}

export const GetAllUserRoles: TypedDocumentNode = gql`
  query GetAllUserRole($input: PaginationInput!, $search: String) {
    getAllUserRole(input: $input, search: $search) {
      item {
        name
        user_role_id
        slug
        user {
          profile {
            profile_id
            first_name
            last_name
          }
        }
      }
    }
  }
`;

export const GetUserRolesBySlug: TypedDocumentNode = gql`
  query GetUserRoleBySlug($slug: String!) {
    getUserRoleBySlug(slug: $slug) {
      user_role_id
      name
      created_at
      permission {
        permission_id
        type
      }
    }
  }
`;
