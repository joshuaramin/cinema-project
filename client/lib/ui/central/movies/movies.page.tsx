"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'
import CentralHeader from '../header'
import store from 'store2'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_MOVIES } from '@/lib/apollo/mutation/movies.mutation'
import { GetAllMovies } from '@/lib/apollo/query/movies.query'
import Pagination from '@/components/pagination'
import styles from '@/styles/lib/ui/central/movies/movies.module.scss';
import { InputText } from '@/components/input'
import Textarea from '@/components/textarea'

type FormFields = {
    genre_id: string[],
    description: string
    duration: string
    name: string
    release_date: any
    year: number
}

export default function MoviesPage() {

    const user = store.get("UserAccount");
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 20;

    const [file, setFile] = useState<File | null>(null)

    const { data, subscribeToMore } = useQuery(GetAllMovies, {
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

    const { register, reset, formState: { errors }, handleSubmit } = useForm<FormFields>({})

    const [mutate] = useMutation(CREATE_MOVIES)

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        mutate({
            variables: {
                file,
                genreId: data.genre_id,
                input: {
                    description: data.description,
                    duration: data.duration,
                    name: data.name,
                    release_date: data.release_date,
                    year: data.year
                }
            },
            onCompleted: () => {

                reset({
                    name: "",
                    duration: "",
                    genre_id: [""],
                    release_date: "",
                    year: undefined,
                    description: "",
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

    }, [subscribeToMore])

    return (
        <div className={styles.container}>
            <CentralHeader
                title='Add New Movies'
                onChange={onHandleSearch}
                submitForm={handleSubmit(onSubmit)}
                body={<>
                    <InputText
                        icon={false}
                        error={errors.name}
                        register={register}
                        isRequired={true}
                        label='Name'
                        name='movies'

                    />
                    <Textarea
                        register={register}
                        error={errors.description}
                        isRequired={true}
                        label='Description'
                        name='description'
                        placeholder=''

                    />
                </>}
            />
            <Pagination
                currentPage={page}
                hasNextPage={data?.getAllMovies?.hasNextPage}
                hasPrevPage={data?.getAllMovies?.hasPrevPage}
                totalItems={data?.getAllMovies?.totalItems}
                totalPage={data?.getAllMovies?.totalPages}
                pages={page}
                setPages={setPage}

            />
        </div>
    )
}
