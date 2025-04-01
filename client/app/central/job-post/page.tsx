import JobPage from '@/lib/ui/central/job-post/job.page'
import Template from '@/lib/ui/central/template'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Job Post"
}


export default function Page() {
    return (
        <Template name='Job Post' goback={false}>
            <JobPage />
        </Template>
    )
}
