import { getClient } from '@/lib/apollo/apolloClient';
import { GetJobPostBySlug } from '@/lib/apollo/query/job_post.query';
import Template from '@/lib/ui/central/template'
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

export default async function Page({ params }: Props) {

    const { slug } = await params;


    const data = await getClient().query({
        query: GetJobPostBySlug,
        variables: {
            slug: slug
        }
    })
    return (
        <Template name='Candidate' goback={true}>
            Candidate {slug}
        </Template>
    )
}
