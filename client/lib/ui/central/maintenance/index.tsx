"use client"

import React from 'react'
import styles from '@/styles/lib/ui/central/maintenance/index.module.scss';
import MaintenanceCard from './card';
import { CountRecords } from '@/lib/apollo/query/count.query';
import { useQuery } from '@apollo/client';
import { motion } from 'motion/react'


export default function MaintenanceIndex() {



    const { data, loading } = useQuery(CountRecords)


    return (
        <div className={styles.container}>
            <motion.div initial={{ opacity: 0, y: 1 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 1 * 0.2, duration: 1
                }}>
                <MaintenanceCard name='Category' url='/central/maintenance/category' count={data?.countingRecords?.category} />
                <MaintenanceCard name='Country' url='/central/maintenance/country' count={data?.countingRecords?.country} />
                <MaintenanceCard name='Position' url='/central/maintenance/position' count={data?.countingRecords?.position} />
                <MaintenanceCard name='Users' url='/central/maintenance/users' count={data?.countingRecords?.users} />
                <MaintenanceCard name='User Roles' url='/central/maintenance/user-roles' count={data?.countingRecords?.user_roles} />
                <MaintenanceCard name='Shift' url='/central/maintenance/shift' count={data?.countingRecords?.shift} />
            </motion.div>
        </div>
    )
}
