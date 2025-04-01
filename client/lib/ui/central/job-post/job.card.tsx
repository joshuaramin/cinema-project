import React from 'react'
import { JobPostInterface } from '@/lib/apollo/query/job_post.query'
import { OpenSansRegular, VolkhovBold, VolkhovLight } from '@/lib/typography'
import { format } from 'date-fns'
import styles from '@/styles/lib/ui/central/job_post/job-card.module.scss';
import { LinkTitle } from '@/components/Link';
import { TbMapPin } from 'react-icons/tb';


export default function JobPostCard({ title, eof, location, slug, description, draft, jobType, job_post_id, status, summary }: JobPostInterface) {
    return (
        <div className={styles.container}>
            <div>
                <LinkTitle name={title} url={`/central/job-post/${slug}`} />
            </div>
            <div className={styles.location}>
                <TbMapPin size={16} />
                <span className={OpenSansRegular.className}>{location}</span>
            </div>
            <div className={styles.summary}>
                <p className={OpenSansRegular.className}>{summary}</p>
            </div>
            <div className={styles.footer}>
                <span className={OpenSansRegular.className}>{format(new Date(eof), "MMM dd, yyyy")}</span>
                <div className={styles.types}>
                    {jobType.map((type, index) => (
                        <span className={OpenSansRegular.className} key={index}>{type}</span>
                    ))}
                </div>

            </div>
        </div>
    )
}
