import React from 'react'
import styles from '@/styles/components/textarea.module.scss'
import { OpenSansRegular, VolkhovLight } from '@/lib/typography'
import { FieldError, UseFormRegister, FieldValues } from 'react-hook-form'
import cn from '@/lib/util/cn'


interface TextareaProps<T extends FieldValues = any> {
    label: string
    isRequired: boolean
    placeholder?: string
    name: string
    error: FieldError | undefined
    register: UseFormRegister<T>
}

export default function Textarea({ label, error, isRequired, register, name, placeholder }: TextareaProps) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <label className={cn(styles.label, VolkhovLight.className)}>{label}</label>
                {isRequired &&
                    <span className={styles.isRequired}>*</span>}
            </div>
            <div className={styles.body}>
                <textarea
                    {...register(name)}
                    className={cn(styles.container, VolkhovLight.className)}
                    placeholder={placeholder}
                />
            </div>
            <div className={styles.errorBody}>
                <span className={styles.error}>{error?.message}</span>
            </div>
        </div>
    )
}
