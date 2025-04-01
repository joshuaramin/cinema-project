"use client"

import React, { ChangeEvent, FC, FormEventHandler, ReactNode, useEffect, useRef, useState } from 'react'
import styles from "@/styles/lib/ui/central/maintenance/header.module.scss";
import Prompt from '@/components/prompt/prompt';
import { ButtonPrimary } from '@/components/button';
import ToastNotification from '@/components/toastNotification';


interface MaintenaceHeaderProps {
    body: ReactNode
    title: string
    submitForm: FormEventHandler<HTMLFormElement>,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const MaintenanceHeader: FC<MaintenaceHeaderProps> = ({ title, onChange, body, submitForm }) => {

    const [toggle, setToggle] = useState<boolean>(false);
    const toggleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (toggleRef.current && !toggleRef.current.contains(event.target as Node)) {
                setToggle(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, [toggleRef])

    const onHandleToggle = () => {
        setToggle(() => !toggle)
    }
    return (
        <div className={styles.container}>
            {
                toggle &&
                <Prompt
                    title={title}
                    onClose={onHandleToggle}
                    body={<>
                        {body}
                    </>}
                    footer={true}
                    submitBtn={
                        <form onSubmit={submitForm}>
                            <ButtonPrimary type='submit' name='Submit' />
                        </form>
                    }
                    headerClose={false}
                />}
            <input className={styles.searchInput} type="search" placeholder='Search here' onChange={onChange} />
            <button className={styles.addNew} onClick={onHandleToggle}>
                <span>Add New</span>
            </button>
            <ToastNotification />
        </div>
    )
}


export default MaintenanceHeader