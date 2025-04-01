import React from 'react'
import { Metadata } from 'next'
import Template from '@/lib/ui/central/template'
import BlogPostPage from '@/lib/ui/central/blog-post/blog.page'
export const metadata: Metadata = {
    title: "Blog Post"
}
export default function Page() {
    return (
        <Template name='Blog Post' goback={false}>
            <BlogPostPage />
        </Template>
    )
}
