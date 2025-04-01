import { getClient } from '@/lib/apollo/apolloClient';
import { GetBlogPostSlug } from '@/lib/apollo/query/blog_post.query';
import BlogSlug from '@/lib/ui/central/blog-post/slug/blog.slug'
import Template from '@/lib/ui/central/template';
import React from 'react'


type Props = {
    params: { slug: string }
}


export async function generateMetadata({ params }: Props) {

    const { slug } = await params;

    const data = await getClient().query({
        query: GetBlogPostSlug,
        variables: {
            slug: slug
        }
    })

    return {
        title: data?.data?.getBlogPostBySlug?.title,
        description: data?.data?.getBlogPostBySlug?.excerpt
    }
}

export default async function BlogPostSlugPage({ params }: Props) {

    const { slug } = await params
    const { data } = await getClient().query({
        query: GetBlogPostSlug,
        variables: {
            slug: slug
        }
    })


    return (
        <Template name={`${data?.getBlogPostBySlug.title}`} goback={true}>
            <BlogSlug />
        </Template>
    )
}
