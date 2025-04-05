
"use client"

import React, { useState } from 'react'
import styles from '@/styles/lib/ui/auth/login.module.scss';
import { InputPassword, InputText } from '@/components/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { OpenSansRegular, OpenSansSemiBold, VolkhovLight } from '@/lib/typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/lib/validation/AuthSchema';
import { useMutation } from '@apollo/client';
import { LoginMutation } from '@/lib/apollo/mutation/auth.mutation';
import Link from 'next/link';
import store from 'store2'
import { toast } from 'react-hot-toast'
import ToastNotification from '@/components/toastNotification';
import { useRouter } from 'next/navigation';

type AuthInput = {
    email: string,
    password: string
}

export default function Login() {
    const router = useRouter();

    const [permission, setPermission] = useState<string[]>([])


    const { register, formState: { errors }, handleSubmit } = useForm<AuthInput>({
        resolver: zodResolver(LoginSchema)
    })

    const [mutate, { data, loading }] = useMutation(LoginMutation)

    const onSubmit: SubmitHandler<AuthInput> = async (data) => {
        mutate({
            variables: {
                input: {
                    email: data.email,
                    password: data.password
                }
            },
            onCompleted: (data) => {
                if (data.login.user?.user_id) {
                    toast.success("Successfully Logged In")
                    const entry = data?.login.user;
                    entry.user_role.permission.map(({ type }: { type: string }) => {
                        return permission.push(type)
                    })

                    store.set("UserAccount", {
                        user_id: entry.user_id,
                        account_no: entry.account_no,
                        email: entry.email,
                        profile: {
                            first_name: entry.profile.first_name,
                            last_name: entry.profile.last_name
                        },
                        user_role: {
                            name: entry.user_role.name,
                            permission: permission
                        }
                    })
                    router.push("/account/onboarding")
                }

                if (data.login.message) {
                    toast.error(data?.login.message)
                }
            },
        })
    }

    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputText
                    name='email'
                    icon={true}
                    isRequired={true}
                    label='Email Address'
                    placeholder='johndoe@example.com'
                    error={errors.email}
                    register={register} />
                <InputPassword
                    error={errors.password}
                    icon={true}
                    isRequired={true}
                    label='Password'
                    name='password'
                    placeholder='Enter your password'
                    register={register}
                />
                <div className={styles.other}>
                    <div className={styles.remember}>
                        <input type="checkbox" />
                        <label className={OpenSansRegular.className}>Remember Me</label>
                    </div>
                </div>
                <div className={styles.submitBtn}>
                    <button type="submit" className={styles.btn}>
                        <span className={OpenSansSemiBold.className}>Login</span>
                    </button>
                </div>
                <div className={styles.account}>
                    <span className={VolkhovLight.className}>Don{"'"}t have an Account? </span>
                    <Link href={'/auth/sign-up'} className={VolkhovLight.className}>Sign Up</Link>
                </div>
            </form>
            <ToastNotification />
        </div>
    )
}
