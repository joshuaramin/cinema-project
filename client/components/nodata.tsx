import React from 'react'
import styles from '@/styles/components/notdata.module.scss';
import {  OpenSansSemiBold } from '@/lib/typography';

export default function NoData() {
    return (
        <div className={styles.container}>
            <span className={OpenSansSemiBold.className}>No Data Available</span>
        </div>
    )
}
