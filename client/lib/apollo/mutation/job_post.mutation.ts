import { gql, TypedDocumentNode } from "@apollo/client";

export const Create_Job_Post: TypedDocumentNode = gql`
  mutation Mutation($positionId: ID!, $input: JobPostInput) {
    create_job_post(position_id: $positionId, input: $input) {
      ... on Job_Post {
        job_post_id
        title
      }
      ... on ErrorObject {
        message
      }
    }
  }
`;
