import React from 'react'
import styles from '@/styles/lib/ui/sidebar/sidebar.module.scss';
import { ButtonLink } from '@/components/Link';
import { TbAdjustmentsHorizontal, TbLayoutDashboard, TbSettings, TbBriefcase2, TbImageInPicture, TbPhotoScan, TbCalendarMonth, } from 'react-icons/tb';
import ProfilePage from './profile/page';
import Image from 'next/image'
import Logo from '@/public/logo.png'
import Search from '@/components/search/search';
import SidebarURL from '@/lib/util/url';
export default function Sidebar() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Image src={Logo} alt="" height={80} width={80} />
            </div>
            <div>
                <Search />
            </div>
            <div className={styles.sidebar}>
                <SidebarURL />
            </div>
            <ProfilePage />
        </div>
    )
}
