"use client"

import styles from '@/styles/lib/ui/central/maintenance/index.module.scss';
import React from 'react'
import { OpenSansLight, OpenSansRegular, OpenSansSemiBold, VolkhovLight } from '@/lib/typography';
import { useRouter } from 'next/navigation';

interface MaintenanceCardInterface {
    name: string
    url: string
    count: number
}

export default function MaintenanceCard({ name, url, count }: MaintenanceCardInterface) {

    const router = useRouter();

    return (
        <div className={styles.maintenanceCard}>
            <div className={styles.nameContainer}>
                <h2 className={OpenSansSemiBold.className}>{name}</h2>
                <span className={OpenSansRegular.className}>Name</span>
            </div>
            <div className={styles.recorderContainer}>
                <h2 className={OpenSansSemiBold.className}>{count === 0 ? "-" : count}</h2>
                <span className={OpenSansRegular.className}>Record</span>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.viewmore} onClick={() => router.push(url)}>
                    <span className={OpenSansSemiBold.className}>View More</span>
                </button>
                <button className={styles.addmore}>
                    <span className={OpenSansSemiBold.className}>Add More</span>
                </button>
            </div>
        </div>
    )
}
