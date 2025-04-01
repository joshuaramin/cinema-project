import { gql, TypedDocumentNode } from "@apollo/client";

interface PermissionInterface {
  permission_id: string;
  type: string;
}

export interface GroupInterface {
  group_id: string;
  name: string;
  description: string;
  is_deleted: boolean;
  created_at: any;
  updated_at: any;
  permission: Array<PermissionInterface>;
}

export const GetAllGroup: TypedDocumentNode = gql`
  query GetAllGroup($search: String) {
    getAllGroup(search: $search) {
      group_id
      name
      description
      is_deleted
      created_at
      updated_at
      permission {
        permission_id
        type
        created_at
        updated_at
      }
    }
  }
`;
