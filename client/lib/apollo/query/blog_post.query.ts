import { gql, TypedDocumentNode } from "@apollo/client";

export interface BlogCardInterface {
  blog_post_id: string;
  title: string;
  slug: string;
  excerpt: string;
  created_at: any;
}

export const GetAllBlogPost: TypedDocumentNode = gql`
  query Query($search: String, $input: PaginationInput!) {
    getAllBlogPost(search: $search, input: $input) {
      item {
        blog_post_id
        title
        slug
        description
        tags
        excerpt
        image
        is_deleted
        created_at
        updated_at
        categories {
          category_id
          category
        }
      }
      hasPrevPage
      hasNextPage
      currentPage
      totalItems
      totalPages
    }
  }
`;

export const GetBlogPostSlug: TypedDocumentNode = gql`
  query GetBlogPostBySlug($slug: String!) {
    getBlogPostBySlug(slug: $slug) {
      blog_post_id
      title
      tags
      excerpt
      description
      image
      slug
      is_deleted
      created_at
      categories {
        category_id
        category
      }
      user {
        profile {
          first_name
          last_name
        }
      }
    }
  }
`;
