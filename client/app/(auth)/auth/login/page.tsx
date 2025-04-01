import React from 'react'
import styles from '@/styles/lib/ui/auth/login.module.scss';
import { OpenSansSemiBold } from '@/lib/typography';
import Login from '@/lib/ui/auth/login';
import { Metadata } from 'next';



export const metadata: Metadata = {
    title: "Login"
}


export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>

            </div>
            <div className={styles.login}>
                <div className={styles.title}>
                    <h2 className={OpenSansSemiBold.className}>Welcome back!</h2>
                </div>
                <Login />
            </div>
        </div>
    )
}
