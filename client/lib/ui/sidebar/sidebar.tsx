import React from 'react'
import styles from '@/styles/lib/ui/sidebar/sidebar.module.scss';
import { ButtonLink } from '@/components/Link';
import { TbAdjustmentsHorizontal, TbLayoutDashboard, TbSettings, TbBriefcase2, TbImageInPicture, TbPhotoScan, TbCalendarMonth, } from 'react-icons/tb';
import ProfilePage from './profile/page';
import Image from 'next/image'
import Logo from '@/public/logo.png'
import Search from '@/components/search/search';
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
                <ButtonLink icon={TbLayoutDashboard} name='Overview' url='/central/overview' />
                <ButtonLink icon={TbImageInPicture} name='Blog Post' url='/central/blog-post' />
                <ButtonLink icon={TbBriefcase2} name='Job Post' url='/central/job-post' />
                <ButtonLink icon={TbCalendarMonth} name='Events' url='/central/events' />
                <ButtonLink icon={TbPhotoScan} name='Media' url='/central/media' />
                <ButtonLink icon={TbAdjustmentsHorizontal} name='Maintenance' url='/central/maintenance' />
                <ButtonLink icon={TbSettings} name='Settings' url='/central/settings' />
            </div>
            <ProfilePage />
        </div>
    )
}
