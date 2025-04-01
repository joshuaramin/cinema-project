"use client"

import React, { ChangeEvent, FC, FormEventHandler, ReactNode, useState, useRef, useEffect } from 'react'
import styles from '@/styles/lib/ui/central/header.module.scss';
import CentralPrompt from '@/components/prompt/central.prompt';
import ToastNotification from '@/components/toastNotification';
import { ButtonPrimary } from '@/components/button';

interface CentralHeaderProps {
    body: ReactNode
    title: string
    submitForm: FormEventHandler<HTMLFormElement>
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const CentralHeader: FC<CentralHeaderProps> = ({ body, onChange, submitForm, title }) => {

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
                <CentralPrompt
                    headerClose={false}
                    title={title}
                    onClose={onHandleToggle}
                    body={<>{body}</>}
                    footer={true}
                    submitBtn={
                        <form onSubmit={submitForm}>
                            <ButtonPrimary type='submit' name='Submit' />
                        </form>
                    }
                />
            }
            <input className={styles.searchInput} type="search" placeholder="Search here" onChange={onChange} />
            <button className={styles.addNew} onClick={onHandleToggle}>
                <span>Add New</span>
            </button>
            <ToastNotification />
        </div>
    )
}


export default CentralHeader
