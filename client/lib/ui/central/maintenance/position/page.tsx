"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'
import MaintenaceHeader from '../header'
import styles from '@/styles/lib/ui/central/maintenance/body.module.scss';
import { GetAllPosition, PositionInterface } from '@/lib/apollo/query/position.query';
import Pagination from '@/components/pagination';
import { isEmpty } from 'lodash';
import NoData from '@/components/nodata';
import Table from '@/components/table';
import { InputText } from '@/components/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { PositonSchema } from '@/lib/validation/PositionSchema';
import { useMutation, useQuery } from '@apollo/client';
import { Create_Position } from '@/lib/apollo/mutation/position.mutation';
import toast from 'react-hot-toast';
import store from 'store2';
import PositionID from './id';
import { PositionSubscription } from '@/lib/apollo/subscription/position.subscriptions';
import { motion } from 'motion/react'
const thead = ["Name", "Author Name", "Date Created", "Actions"]

type FormFields = {
    position: string
}

export default function PositionPage() {

    const user = store.get("UserAccount")
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1)
    const itemsPerPage = 20

    const { data, subscribeToMore } = useQuery(GetAllPosition, {
        variables: {
            input: {
                take: itemsPerPage,
                page: page
            },
            search
        }
    })

    const onHandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }


    const { register, formState: { errors, }, handleSubmit, reset } = useForm<FormFields>({
        resolver: zodResolver(PositonSchema),
    })


    const [mutate] = useMutation(Create_Position)


    const onSubmit: SubmitHandler<FormFields> = (data) => {
        mutate({
            variables: {
                input: {
                    position: data.position,
                },
                userId: user?.user_id
            },
            onCompleted: () => {
                toast.success("Successfully Created")
                reset({
                    position: ""
                })
            },
            context: {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY
                }
            }
        })
    }

    useEffect(() => {
        return subscribeToMore({
            document: PositionSubscription,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const newPosition = subscriptionData.data.PositionSubscriptions

                return Object.assign({}, prev, {
                    getAllPosition: {
                        ...prev.getAllPosition,
                        item: [newPosition, ...prev.getAllPosition.item]
                    }
                })

            }
        })
    }, [subscribeToMore])

    return (
        <div className={styles.container}>
            <MaintenaceHeader
                title={'Add New Position'}
                onChange={onHandleSearch}
                submitForm={handleSubmit(onSubmit)}
                body={<>
                    <InputText
                        label='Position'
                        icon={false}
                        isRequired={true}
                        placeholder='Enter a Position'
                        name='position'
                        register={register}
                        error={errors.position}
                        type='text'
                    />
                </>}

            />
            <div className={styles.body}>
                {isEmpty(data?.getAllPosition?.item) ? <NoData /> : <Table
                    thead={thead}
                    tbody={<>
                        {isEmpty(data?.getAllPosition.item) ? <NoData /> : data?.getAllPosition.item.map(({ position_id, position, created_at, user }: PositionInterface) => (
                            <PositionID key={position_id} position={position} created_at={created_at} user={user} position_id={position_id} />
                        ))}
                    </>}
                />}
            </div>
            <Pagination
                currentPage={page}
                hasNextPage={data?.getAllPosition?.hasNextPage}
                hasPrevPage={data?.getAllPosition?.hasPrevPage}
                totalItems={data?.getAllPosition?.totalItems}
                totalPage={data?.getAllPosition?.totalPages}
                pages={page}
                setPages={setPage}
            />
        </div>
    )
}
