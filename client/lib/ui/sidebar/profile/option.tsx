"use client"


import React, { FC, forwardRef } from 'react'
import { TbLogout, TbSettings } from 'react-icons/tb';
import styles from '@/styles/lib/ui/sidebar/Profile/option.module.scss'
import { deleteCookie } from 'cookies-next'
import store from 'store2';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ToastNotification from '@/components/toastNotification';
import { useMutation } from '@apollo/client';
import { Logout_Activity_Logs } from '@/lib/apollo/mutation/activity_logs.mutation';

interface Props {
    onClose: () => void
    onCloseSettings: () => void
}

const OptionContainer: FC<Props> = forwardRef<HTMLDivElement, Props>(({ onCloseSettings, onClose }, ref) => {


    const user = store.get("UserAccount");
    const router = useRouter();

    const [mutate] = useMutation(Logout_Activity_Logs, {
        variables: {
            userId: user?.user_id
        }
    })

    const onHandleLogout = () => {
        toast.success("Successfully Logout")
        mutate()
        store.remove("UserAccount");
        deleteCookie("access_token")
        router.push("/")
    }


    return (
        <div className={styles.optionContainer}>
            <button onClick={() => {
                onCloseSettings()
                onClose()
            }}>
                <TbSettings size={23} />
                <span>Settings</span>
            </button>
            <hr />
            <button onClick={onHandleLogout} type="button">
                <TbLogout size={23} />
                <span>Logout</span>
            </button>
            <ToastNotification />
        </div>
    )
})


OptionContainer.displayName = "OptionContainer"
export default OptionContainer
