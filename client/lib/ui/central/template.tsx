"use client"

import React, { ReactNode } from 'react'
import styles from '@/styles/lib/ui/central/template.module.scss';
import { OpenSansRegular, OpenSansSemiBold } from '@/lib/typography';
import { TbArrowLeft, TbChevronLeft } from 'react-icons/tb';
import { useParams, usePathname, useRouter } from 'next/navigation';

interface Props {
    name: string
    goback: boolean
    children: ReactNode
}

export default function Template({ children, name, goback }: Props) {

    const router = useRouter()

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={`${OpenSansSemiBold.className} ${styles.title}`}>{name}</h2>
                {goback ?
                    <button onClick={() => router.back()}>
                        <TbArrowLeft size={18} />
                        <span className={OpenSansSemiBold.className}>Return</span>
                    </button> : null}
            </div>
            {children}
        </div>
    )
}
