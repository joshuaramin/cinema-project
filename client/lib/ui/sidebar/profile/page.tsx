"use client"


import React from 'react'
import styles from '@/styles/lib/ui/sidebar/Profile/page.module.scss'
import { useQuery } from '@apollo/client'
import { GetUserById } from '@/lib/apollo/query/user.query'
import store from 'store2'
import Spinner from '@/components/spinner'
import { OpenSansRegular } from '@/lib/typography'
import { TbBell } from 'react-icons/tb'


export default function ProfilePage() {


    const user = store.get("UserAccount")
    const { data, loading } = useQuery(GetUserById, {
        variables: {
            userId: user?.user_id
        }
    })

    return (
        <div className={styles.container}>
            {loading ? <Spinner heigth={30} width={30} /> :
                <div className={styles.profileContainer}>
                    <div className={styles.avatar}></div>
                    <div className={styles.pf}>
                        <span className={`${styles.info} ${OpenSansRegular.className}`}>{data?.getUserById.profile.first_name} {data?.getUserById.profile.last_name}</span>
                        <span className={`${OpenSansRegular.className} ${styles.account_no}`}>#{data?.getUserById.account_no}</span>
                    </div>
                </div>
            }
            <div className={styles.notification}>
                <button>
                    <TbBell size={23} />
                </button>
            </div>
        </div>
    )
}
