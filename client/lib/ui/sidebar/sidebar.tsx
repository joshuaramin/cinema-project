"use client"

import React, { useEffect, useRef, useState } from 'react'
import styles from '@/styles/lib/ui/sidebar/sidebar.module.scss';
import ProfilePage from './profile/page';
import Image from 'next/image'
import Logo from '@/public/logo.png'
import Search from '@/components/search/search';
import SidebarURL from '@/lib/util/url';

export default function Sidebar() {

    const profileRef = useRef<HTMLDivElement>(null);
    const [profile, setProfile] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfile(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [profileRef])

    const onHandleToggleProfile = () => {
        setProfile(() => !profile)
    }

    return (
        <div ref={profileRef} className={styles.container}>
            <div className={styles.header}>
                <Image src={Logo} alt="" height={80} width={80} />
            </div>
            <div>
                <Search />
            </div>
            <div className={styles.sidebar}>
                <SidebarURL />
            </div>
            <ProfilePage profile={profile} onClose={onHandleToggleProfile} />
        </div>
    )
}
