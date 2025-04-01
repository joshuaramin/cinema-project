"use client"

import React from 'react'
import styles from '@/styles/lib/ui/central/job_post/job-slug.module.scss';
import { ButtonRoute } from '@/components/button';

interface Props {
    slug: string
}

export default function JobPostSlug({ slug }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <ButtonRoute name='Details' url={`/central/job-post/${slug}`} />
                <ButtonRoute name='Candidate' url={`/central/job-post/${slug}/candidate`} />
                {/* <ButtonRoute name='Details' /> */}
            </div>
            <div className={styles.body}>

            </div>
        </div>
    )
}
