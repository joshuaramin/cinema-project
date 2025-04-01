import { gql, TypedDocumentNode } from "@apollo/client";

export const Job_PostSubscriptions: TypedDocumentNode = gql`
  subscription JobPostSubscriptions {
    JobPostSubscriptions {
      job_post_id
      title
      summary
      description
      status
      slug
      location
      jobType
      eof
      is_deleted
      created_at
      updated_at
    }
  }
`;
