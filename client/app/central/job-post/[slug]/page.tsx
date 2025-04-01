import { getClient } from '@/lib/apollo/apolloClient';
import { GetJobPostBySlug } from '@/lib/apollo/query/job_post.query';
import JobPostSlug from '@/lib/ui/central/job-post/slug/JobPostSlug';
import Template from '@/lib/ui/central/template';
import React from 'react'


type Props = {
    params: { slug: string }
}


export async function generateMetadata({ params }: Props) {

    const { slug } = await params;

    const data = await getClient().query({
        query: GetJobPostBySlug,
        variables: {
            slug: slug
        }
    })


    return {
        title: data?.data.getJobPostBySlug?.title,
        description: data?.data.getJobPostBySlug?.summary
    }
}

export default async function JobPostIdPage({ params }: Props) {


    const { slug } = await params;


    const data = await getClient().query({
        query: GetJobPostBySlug,
        variables: {
            slug: slug
        }
    })
    return (
        <Template goback={true} name={data?.data.getJobPostBySlug?.title}>
            <JobPostSlug slug={data?.data?.getJobPostBySlug?.slug} />
        </Template>
    )
}
