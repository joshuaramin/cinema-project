import React from 'react'
import styles from '@/styles/components/button.module.scss';
import { OpenSansSemiBold, VolkhovLight } from '@/lib/typography';
import { useRouter } from 'next/navigation'


interface ButtonProps {
    name: string
    type?: 'submit' | 'button' | 'reset'
}

export function ButtonPrimary({ name, type }: ButtonProps) {
    return (
        <button type={type} className={styles.container}>
            <span className={VolkhovLight.className}>{name}</span>
        </button>
    )
}

interface ButtonDeleteProps {
    name: string
}

export function ButtonDelete({ name }: ButtonDeleteProps) {
    return (
        <button type='submit' className={styles.deleteBtnContainer}>
            <span className={VolkhovLight.className}>{name}</span>
        </button>
    )
}

interface DisabledBtnProps {
    name: string
}

export function ButtonDisabled({ name }: DisabledBtnProps) {
    return (
        <button disabled className={styles.disabledBtn}>
            <span className={VolkhovLight.className}>{name}</span>
        </button>

    )
}

interface ButtonRouteProps {
    name: string
    url: string
}

export function ButtonRoute({ name, url }: ButtonRouteProps) {

    const router = useRouter()

    return (
        <button className={styles.buttonRoutes} onClick={() => router.push(url)}>
            <span className={OpenSansSemiBold.className}>{name}</span>
        </button>
    )
}