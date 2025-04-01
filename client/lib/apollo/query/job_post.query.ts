import { gql, TypedDocumentNode } from "@apollo/client";

export interface JobPostInterface {
  job_post_id: string;
  title: string;
  summary: string;
  slug: string;
  status: string;
  jobType: string[];
  description: string;
  location: string;
  eof: any;
  draft: string;
}

export const GetAllJobPost: TypedDocumentNode = gql`
  query GetAllJobPost($input: PaginationInput!, $search: String) {
    getAllJobPost(input: $input, search: $search) {
      totalPages
      currentPage
      totalItems
      hasNextPage
      hasPrevPage
      item {
        job_post_id
        title
        slug
        status
        jobType
        description
        location
        summary
        eof
        is_deleted
        created_at
        updated_at
      }
    }
  }
`;

export const GetJobPostBySlug: TypedDocumentNode = gql`
  query GetJobPostBySlug($slug: String) {
    getJobPostBySlug(slug: $slug) {
      job_post_id
      slug
      title
      summary
    }
  }
`;

export const GetJobPostById: TypedDocumentNode = gql`
  query GetJobPostById($jobPostId: ID!) {
    getJobPostById(job_post_id: $jobPostId) {
      job_post_id
      title
      summary
    }
  }
`;
