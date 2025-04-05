"use client"


import React, { FC, forwardRef, useState } from 'react'
import styles from '@/styles/lib/ui/sidebar/Profile/page.module.scss'
import { useQuery } from '@apollo/client'
import { GetUserById } from '@/lib/apollo/query/user.query'
import { OpenSansRegular } from '@/lib/typography'
import { TbBell } from 'react-icons/tb'
import OptionContainer from './option'
import store from 'store2'
import Spinner from '@/components/spinner'
import cn from '@/lib/util/cn'
import SettingsPrompt from '@/components/prompt/setting.prompt'


interface Props {
    profile: boolean
    onClose: () => void
}

const ProfilePage: FC<Props> = forwardRef<HTMLDivElement, Props>(({ profile, onClose }, ref) => {

    const user = store.get("UserAccount");
    const [settings, setSettings] = useState<boolean>(false);

    const { data, loading } = useQuery(GetUserById, {
        variables: {
            userId: user?.user_id
        }
    })

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    const onHandleSettings = () => {
        setSettings(() => !settings)
    }
    return (
        <div  className={styles.container}>
            {
                settings &&
                <SettingsPrompt
                    onClose={onHandleSettings}
                />
            }
            <div className={styles.profileContainer}>
                {loading ?
                    <Spinner
                        color={[
                            "#ffffff", "#ffffff", "#ffffff",
                            "#ffffff", "#ffffff", "#ffffff"
                        ]}
                        heigth={30}
                        width={30}
                    /> :
                    <>
                        {
                            profile &&
                            <OptionContainer
                                onClose={onClose}
                                onCloseSettings={onHandleSettings}
                            />
                        }
                        <div onClick={onClose} className={styles.avatar}></div>
                        <div className={styles.pf}>
                            <span className={cn(styles.info, OpenSansRegular.className)}>{data?.getUserById.profile.first_name} {data?.getUserById.profile.last_name}</span>
                            <span className={cn(OpenSansRegular.className, styles.account_no)}>#{data?.getUserById.account_no}</span>
                        </div>
                    </>
                }
            </div>
            <div className={styles.notification}>
                <button>
                    <TbBell size={23} />
                </button>
            </div>
        </div>
    )
})


export default ProfilePage