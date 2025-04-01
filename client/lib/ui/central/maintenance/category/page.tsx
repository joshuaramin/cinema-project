"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from '@/styles/lib/ui/central/maintenance/body.module.scss';
import MaintenanceHeader from '../header';
import NoData from '@/components/nodata';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCategorySchema } from '@/lib/validation/CategorySchema';
import { InputText } from '@/components/input';
import Table from '@/components/table';
import { CategoryInterface, GetAllCategories } from '@/lib/apollo/query/category.query';
import { useMutation, useQuery } from '@apollo/client';
import { Create_Category } from '@/lib/apollo/mutation/category.mutation';
import toast from 'react-hot-toast';
import Pagination from '@/components/pagination';
import store from 'store2';
import CategoryID from './id';
import { isEmpty } from 'lodash';
import { CategorySubscriptions } from '@/lib/apollo/subscription/category.subscriptions';

const thead = ["Name", "Author Name", "Date Created", "Actions"]

type CategoryInput = {
    category: string
}

export default function CategoryPage() {

    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1)
    const itemsPerPage = 20
    const user = store.get("UserAccount")

    const { data, subscribeToMore } = useQuery(GetAllCategories, {
        variables: {
            input: {
                take: itemsPerPage,
                page: page
            },
            search
        }
    })

    const onHandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const { handleSubmit, formState: { errors }, register, reset } = useForm<CategoryInput>({
        resolver: zodResolver(AddCategorySchema)
    })


    const [mutate] = useMutation(Create_Category)


    const onSubmit: SubmitHandler<CategoryInput> = (data) => {
        mutate({
            variables: {
                input: {
                    category: data.category
                },
                userId: user?.user_id
            },
            onCompleted: (data) => {
                if (data.create_category.category_id) {
                    toast.success("Successfully Created")
                    reset({ category: "" })
                }
                if (data.create_category.message) {
                    toast.error(data.create_category.message)
                }
            },
        })
    }


    useEffect(() => {

        return subscribeToMore({
            document: CategorySubscriptions,
            updateQuery: (prev, { subscriptionData }) => {

                if (!subscriptionData.data) return prev;

                const newCategory = subscriptionData.data.CategorySubscriptions

                return Object.assign({}, prev, {
                    getAllCategories: {
                        ...prev.getAllCategories,
                        item: [newCategory, ...prev.getAllCategories.item,
                        ],
                    }
                })

            }
        })
    }, [subscribeToMore])

    return (
        <div className={styles.container}>
            <MaintenanceHeader
                title='Add New Category'
                submitForm={handleSubmit(onSubmit)}
                onChange={onHandleSearch}
                body={<>
                    <InputText
                        icon={false}
                        isRequired={true}
                        label='Category'
                        name='category'
                        error={errors.category}
                        register={register}
                    />
                </>}

            />
            <div className={styles.body}>
                {isEmpty(data?.getAllCategories?.item) ? <NoData /> :
                    <Table thead={thead} tbody={data?.getAllCategories?.item.map(({ category_id, category, created_at, user }: CategoryInterface) => (
                        <CategoryID
                            key={category_id}
                            category_id={category_id}
                            category={category}
                            user={user}
                            created_at={created_at}
                        />
                    ))} />
                }
            </div>
            <Pagination
                currentPage={page}
                hasNextPage={data?.getAllCategories?.hasNextPage}
                hasPrevPage={data?.getAllCategories?.hasPrevPage}
                totalItems={data?.getAllCategories?.totalItems}
                totalPage={data?.getAllCategories?.totalPages}
                pages={page}
                setPages={setPage}
            />
        </div>
    )
}
