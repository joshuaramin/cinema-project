"use client"


import React from 'react'
import styles from '@/styles/lib/ui/account/onboarding.module.scss';
import Spinner from '@/components/spinner';
import { OpenSansRegular, OpenSansSemiBold, VolkhovBold } from '@/lib/typography';
import { useQuery } from '@apollo/client';
import { GetUserById } from '@/lib/apollo/query/user.query';
import store from 'store2';
import { useRouter } from 'next/navigation';


export default function Onboarding() {

    const router = useRouter();

    const user = store.get("UserAccount");

    const { data, } = useQuery(GetUserById, {
        variables: {
            userId: user?.user_id
        },
        onCompleted: () => {
            router.push("/central/overview")
        }
    })

    return (
        <div className={styles.container}>
            <h1 className={OpenSansSemiBold.className}>Welcome Back! {data?.getUserById.profile.first_name} {data?.getUserById.profile.last_name}</h1>
            <h2 className={VolkhovBold.className}>Logging into your account</h2>
            <Spinner heigth={40} width={40} />
        </div>
    )
}
