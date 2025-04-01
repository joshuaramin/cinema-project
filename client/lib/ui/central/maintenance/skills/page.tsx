
import React from 'react'
import MaintenanceHeader from '../header'
import Pagination from '@/components/pagination'
import styles from '@/styles/lib/ui/central/maintenance/body.module.scss';
import NoData from '@/components/nodata';


export default function SkillPage() {



    return (
        <div className={styles.container}>

            <div className={styles.body}>
                <div className={styles.inner}>
                    <NoData />
                </div>
            </div>
        </div>
    )
}
