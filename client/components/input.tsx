import React, { ChangeEvent, useState } from 'react'
import styles from '@/styles/components/input.module.scss'
import { VolkhovLight } from '@/lib/typography'
import { TbLock, TbEyeOff, TbMail, TbEye, TbX, TbCalendar } from 'react-icons/tb'
import { FieldError, FieldValues, Merge, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Links } from './Link'
import cn from '@/lib/util/cn'
import MiniCalendar from './calendar/miniCalendar'
import { format } from 'date-fns'


interface InputFieldProps<T extends FieldValues = any> {
    icon: boolean
    label: string;
    name: string;
    type?: string;
    isRequired: boolean;
    placeholder?: string;
    error: FieldError | undefined;
    register: UseFormRegister<T>;
}

export function InputText({ icon, name, label, register, error, isRequired, placeholder, type }: InputFieldProps) {


    return (
        <div className={styles.inputText}>
            <div className={styles.header}>
                <label className={cn(styles.label, VolkhovLight.className)}>{label}</label>
                {isRequired && <span className={styles.isRequired}>*</span>}
            </div>
            <div className={styles.body}>
                {icon ? <div>
                    <TbMail size={22} />
                </div> : null}
                <input
                    type={type}
                    id={name}
                    className={VolkhovLight.className}
                    placeholder={placeholder}
                    {...register(name)}
                />
            </div>
            <div className={styles.errorBody}>
                <span className={styles.error}>{error?.message}</span>
            </div>
        </div>
    )
}

export function InputPassword({ name, label, register, error, isRequired, placeholder, type }: InputFieldProps) {


    const [toggle, setToggle] = useState(false);

    const onHandleToggle = () => {
        setToggle(() => !toggle)
    }

    return (
        <div className={styles.inputPassword}>
            <div className={styles.header}>
                <div className={styles.core}>
                    <label className={cn(styles.label, VolkhovLight.className)}>{label}</label>
                    {isRequired && <span className={styles.isRequired}>*</span>}
                </div>
                <div className={styles.fp}>
                    <Links url={'/forgot-password?'} name={'Forgot Password?'} />
                </div>
            </div>

            <div className={styles.body}>
                <div>
                    <TbLock size={22} />
                </div>
                <input
                    className={VolkhovLight.className}
                    type={toggle ? 'text' : 'password'}
                    placeholder={placeholder}
                    {...register(name)}
                />

                <button type="button" onClick={onHandleToggle}>
                    {toggle ? <TbEyeOff size={22} /> : <TbEye size={22} />}
                </button>
            </div>
            <div className={styles.errorBody}>
                <span className={styles.error}>{error?.message}</span>
            </div>
        </div>
    )
}

interface InputTags<T extends FieldValues = any> {
    label: string
    name: string
    isRequired: boolean
    error?: any;
    value: string[]
    setValue: UseFormSetValue<T>
    register: UseFormRegister<T>;
}

export function InputTag({ label, isRequired, name, register, error, setValue, value }: InputTags) {


    const [tags, setTags] = useState<string[]>([])
    const [inputValue, setInputValue] = useState<string>("");


    const onHandleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }


    const onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();

            const newTags = [...tags, inputValue];
            setTags(newTags);
            setValue(name, newTags);
            setInputValue("");
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        const newTags = tags.filter(tag => tag !== tagToRemove);
        setTags(newTags);
        setValue(name, newTags);
    }



    return (
        <div className={styles.inputTags}>
            <div className={styles.header}>
                <div className={styles.core}>
                    <label className={cn(styles.label, VolkhovLight.className)}>{label}</label>
                    {isRequired && <span className={styles.isRequired}>*</span>}
                </div>
            </div>
            <div className={styles.tags}>
                {value.map((val: string, index: number) => (
                    <div key={index} className={styles.tag}>
                        <span className={VolkhovLight.className}>{val}</span>
                        <button onClick={() => handleRemoveTag(val)}>
                            <TbX size={15} />
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles.body}>
                <input type="text"
                    value={inputValue}
                    {...register(name)}
                    onChange={onHandleInputChange}
                    onKeyDown={onHandleKeyDown}
                    placeholder='Press Enter to add tag'
                />
            </div>
            <div className={styles.errorBody}>
                <span className={styles.error}>{error?.message}</span>
            </div>
        </div >
    )
}


interface InputCalendarProps<T extends FieldValues = any> {
    name: string
    label: string
    isRequired: boolean
    error: FieldError | undefined;
    register: UseFormRegister<T>;
}

export function InputCalendar({ error, isRequired, label, name, register }: InputCalendarProps) {


    const [date, setDate] = useState("");
    const [toggle, setToggle] = useState(false);

    const onHandleToggle = () => {
        setToggle(() => !toggle);
    }

    return (
        <div className={styles.inputCalendar}>
            <div className={styles.header}>
                <div className={styles.core}>
                    <label className={cn(styles.label, VolkhovLight.className)}>{label}</label>
                    {isRequired && <span className={styles.isRequired}>*</span>}
                </div>
            </div>
            <div className={styles.body}>
                <input value={date} className={cn(VolkhovLight.className)} type="text" placeholder='' {...register(name)} />
                <div>
                    <button onClick={onHandleToggle}>
                        <TbCalendar size={23} />
                    </button>
                    {toggle && <MiniCalendar value={date} setDate={setDate} />}
                </div>
            </div>
            <div className={styles.errorBody}>
                <span className={styles.error}>{error?.message}</span>
            </div>
        </div>
    )
}