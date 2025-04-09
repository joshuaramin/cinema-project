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
                <MaintenanceCard name='Genre' url='/central/maintenance/genre' count={0} />
                <MaintenanceCard name='Theater' url='/central/maintenance/theater' count={0} />
                <MaintenanceCard name='Users' url='/central/maintenance/users' count={data?.countingRecords?.users} />
                <MaintenanceCard name='User Roles' url='/central/maintenance/user-roles' count={data?.countingRecords?.user_roles} />
            </motion.div>
        </div>
    )
}
