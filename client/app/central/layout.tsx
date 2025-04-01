import Calendar from '@/lib/ui/sidebar/event'
import Sidebar from '@/lib/ui/sidebar/sidebar'
import React, { ReactNode } from 'react'
import styles from '@/styles/layout/central.module.scss';

interface Props {
    children: ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.body}>
                {children}
            </div>
            <Calendar />
        </div>
    )
}
