"use client"

import React from 'react'

import { OpenSansRegular, OpenSansSemiBold } from '@/lib/typography';

import styles from '@/styles/lib/ui/notfound.module.scss';
import { useRouter } from 'next/navigation';
import Header from './header';
import Footer from './footer';

export default function NotFound() {

    const router = useRouter();


    return (
        <>

            <Header />
            <div className={styles.container}>
                <div className={styles.body}>
                    <h2 className={OpenSansRegular.className}>Error 404</h2>
                    <h3 className={OpenSansSemiBold.className}>Page Not Found</h3>
                    <span className={OpenSansRegular.className}>The Page you're trying to access doesn't exist or has been removed</span>
                    <div className={styles.goback}>
                        <button onClick={() => router.back()}>
                            <span>Go back</span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}
