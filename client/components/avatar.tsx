import React from 'react'
import styles from '@/styles/components/avatar.module.scss';
import { isEmpty } from 'lodash';
import cn from '@/lib/util/cn';
import Image from 'next/image'


interface Props {
    size: 'small' | 'large'
    url?: string
    name: string
}

export default function Avatar({ name, size, url }: Props) {
    return (
        <div className={cn(
            size === "small" && `${styles.small} ${styles.container}`,
            size === "large" && `${styles.large} ${styles.container}`
        )}>
            {isEmpty(url) ? <span>{name[0]}</span> : null}
        </div>
    )
}
