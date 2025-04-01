

import React from 'react'
import styles from '@/styles/lib/ui/central/blog_post/blog-card.module.scss';
import { format } from 'date-fns';
import { OpenSansRegular } from '@/lib/typography';
import { BlogCardInterface } from '@/lib/apollo/query/blog_post.query';
import { LinkTitle } from '@/components/Link';

export default function BlogPostCard({ title, created_at, excerpt, slug }: BlogCardInterface) {
    return (
        <div className={styles.container}>
            <div className={styles.header}></div>
            <div className={styles.footer}>
                <div className={styles.title}>
                    <LinkTitle name={title} url={`/central/blog-post/${slug}`} />
                </div>
                <div className={styles.excerpt}>
                    <p className={OpenSansRegular.className}>{excerpt}</p>
                </div>
                <div>
                    <span className={OpenSansRegular.className}>{format(new Date(created_at), "MMMM dd, yyyy")}</span>

                </div>
            </div>
        </div>
    )
}
