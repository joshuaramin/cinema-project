"use client"

import React, { useEffect, useState } from 'react'
import styles from '@/styles/lib/ui/header.module.scss';
import { Links } from '@/components/Link';
import { OpenSansRegular } from '../typography';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Logo from '@/public/logo.png';
import store from 'store2';
import { TbMenu2 } from 'react-icons/tb';
import HeaderNavigation from './navigation';

export default function Header() {

    const router = useRouter();
    const [user, setUser] = useState<string>("");
    const [toggle, setTogle] = useState<boolean>(false);


    useEffect(() => {

        const user = store.get("UserAccount");

        setUser(user?.user_Id)
    }, [user])

    const onHandleToggle = () => {
        setTogle(() => !toggle)
    }

    return (
        <div className={styles.container}>
            {
                toggle &&
                <HeaderNavigation onClose={onHandleToggle} />
            }
            <Image src={Logo} alt="logo" height={90} width={90} onClick={() => router.push("/")} />

            <div className={styles.links}>
                <Links name={'Documentations'} url='/documentations' />
                <Links name={'Case Studies'} url='/case-studies' />
                <Links name={'About Us'} url='/about-us' />
                <Links name={'Careers'} url='/careers' />
                <Links name={'Blog Post'} url='/blog-post' />
            </div>
            <div className={styles.authentication}>

                <button onClick={() => router.push(user ? "/central/overview" : "/auth/login")}>
                    <span className={OpenSansRegular.className}>
                        {user ? "Dashboard" : "Login"}
                    </span>
                </button>
            </div>
            <div className={styles.unauthenticated}>
                <button onClick={onHandleToggle}>
                    <TbMenu2 size={18} />
                </button>
            </div>
        </div>
    )
}
