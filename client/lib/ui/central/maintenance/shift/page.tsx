"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from '@/styles/lib/ui/central/maintenance/body.module.scss';
import MaintenanceHeader from '../header';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { AddShift } from '@/lib/validation/ShiftSchema';
import { Create_Shift } from '@/lib/apollo/mutation/shift.mutation';
import { GetAllShift, ShiftInterface } from '@/lib/apollo/query/shift.query';
import { isEmpty } from 'lodash';
import NoData from '@/components/nodata';
import Table from '@/components/table';
import ShiftID from './id';
import { ShiftSubscription } from '@/lib/apollo/subscription/shift.subscriptions';
import { InputText } from '@/components/input';
import store from 'store2';
import Pagination from '@/components/pagination';


const thead = ["Shift Type", "Author Name", "Date Created", "Actions"]

type FormFields = {
    type: string
}


export default function ShiftPage() {

    const user = store.get("UserAccount");
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 20;


    const { data, subscribeToMore } = useQuery(GetAllShift, {
        variables: {
            input: {
                page: page,
                take: itemsPerPage
            },
            search: search
        }
    })

    const onHandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }


    const { register, formState: { errors }, handleSubmit, reset } = useForm<FormFields>({
        resolver: zodResolver(AddShift)
    })


    const [mutate] = useMutation(Create_Shift)


    const onSubmit: SubmitHandler<FormFields> = (data) => {
        mutate({
            variables: {
                input: {
                    type: data.type,
                },
                userId: user?.user_id
            },
            onCompleted: (data) => {
                if (data?.create_shift.shift_id) {
                    toast.success("Successfully Created")
                    reset({ type: "" })
                }

                if (data?.create_shift.message) {
                    toast.error(data?.create_shift.message)
                }
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
            document: ShiftSubscription,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const newShift = subscriptionData.data.ShiftSubscriptions

                return Object.assign({}, prev, {
                    getAllShift: {
                        ...prev.getAllShift,
                        item: [...prev.getAllShift.item, newShift]
                    }
                })
            }
        })
    }, [subscribeToMore])


    return (
        <div className={styles.container}>
            <MaintenanceHeader
                title={'Add New Shift Type'}
                onChange={onHandleSearch}
                submitForm={handleSubmit(onSubmit)}
                body={<>
                    <InputText
                        label='Shift Type'
                        icon={false}
                        isRequired={true}
                        placeholder='Enter a Shift type'
                        name='type'
                        register={register}
                        error={errors.type}
                        type='text'
                    />
                </>}
            />
            <div className={styles.body}>
                {isEmpty(data?.getAllShift?.item) ? <NoData /> :
                    <Table thead={thead} tbody={data?.getAllShift?.item.map(({ shift_id, type, user, created_at }: ShiftInterface) => (
                        <ShiftID key={shift_id} type={type} user={user} shift_id={shift_id} created_at={created_at} />
                    ))} />
                }
            </div>
            <Pagination
                currentPage={page}
                hasNextPage={data?.getAllShift?.hasNextPage}
                hasPrevPage={data?.getAllShift?.hasPrevPage}
                totalItems={data?.getAllShift?.totalItems}
                totalPage={data?.getAllShift?.totalPages}
                pages={page}
                setPages={setPage}
            />
        </div>
    )
}
