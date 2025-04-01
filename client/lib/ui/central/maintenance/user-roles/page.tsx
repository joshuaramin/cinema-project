"use client"

import React, { ChangeEvent, useState } from 'react'
import styles from '@/styles/lib/ui/central/maintenance/gridBody.module.scss'
import MaintenanceHeader from '../header'
import Card from './card'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputText } from '@/components/input'
import { useMutation, useQuery } from '@apollo/client'
import { GetAllUserRoles, RoleInterface } from '@/lib/apollo/query/role.query'
import { isEmpty } from 'lodash'
import NoData from '@/components/nodata'
import Textarea from '@/components/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRoleSchema } from '@/lib/validation/UserRoleSchema'
import { CreateUser_Roles } from '@/lib/apollo/mutation/user_roles.mutation'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

type FormFields = {
    name: string
    description?: string
}

export default function UserRolesPages() {

    const [search, setSearch] = useState<string>("")



    const { data } = useQuery(GetAllUserRoles, {
        variables: {
            input: {
                take: 20,
                page: 1
            },
            search
        }
    })

    const onHandlSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }


    const { register, formState: { errors }, handleSubmit, reset } = useForm<FormFields>({
        resolver: zodResolver(UserRoleSchema)
    })


    const [mutate] = useMutation(CreateUser_Roles)


    const onSubmit: SubmitHandler<FormFields> = (data) => {
        mutate({
            variables: {
                name: data.name,
                description: data.description
            },
            onCompleted: (data) => {
                if (data?.create_user_role.user_role_id) {
                    toast.success("Successfully Created")
                    reset()
                }

                if (data?.create_user_role.message) {
                    toast.error(data?.create_user_role.message)
                }
            },
            onError: (data) => {
                if (data?.message) {
                    toast.error(data?.message)
                }
            },
            refetchQueries: [GetAllUserRoles],
            context: {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY
                }
            }
        })
    }


    return (
        <div className={styles.container}>
            <MaintenanceHeader
                title='Add New User Roles'
                onChange={onHandlSearch}
                submitForm={handleSubmit(onSubmit)}
                body={<>
                    <InputText
                        error={errors.name}
                        isRequired={true}
                        label='Name'
                        name='name'
                        icon={false}
                        register={register}
                        type='text'
                    />
                    <Textarea
                        error={errors.description}
                        isRequired={false}
                        label='Description'
                        name='description'
                        register={register}
                        placeholder='type here...'
                    />
                </>}

            />
            <div className={styles.body}>
                {isEmpty(data?.getAllUserRole.item) ? <NoData /> : data?.getAllUserRole.item.map(({ user_role_id, name, slug, user }: RoleInterface, index: number) => (
                    <motion.div
                        initial={{ opacity: 0, y: 1 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: index * 0.2, duration: 1
                        }} key={user_role_id}
                    >
                        <Card name={name} user_role_id={user_role_id} slug={slug} user={user} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
