"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'
import CentralHeader from '../header'
import store from 'store2'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_MOVIES } from '@/lib/apollo/mutation/movies.mutation'
import { GetAllMovies, MoviesInterface } from '@/lib/apollo/query/movies.query'
import Pagination from '@/components/pagination'
import { InputCalendar, InputText } from '@/components/input'
import Textarea from '@/components/textarea'
import { GetAllGenere } from '@/lib/apollo/query/genre.query'
import { SelectArray } from '@/components/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Movieschema } from '@/lib/validation/MovieSchema'
import { FileUpload } from '@/components/fileupload'
import toast from 'react-hot-toast'
import { isEmpty } from 'lodash'
import styles from '@/styles/lib/ui/central/movies/movies.module.scss';
import NoData from '@/components/nodata'
import MovieID from './id.page'


type FormFields = {
    file: File
    genre_id: string[],
    description: string
    duration: string
    name: string
    release_date: any
    year: string
}

export default function MoviesPage() {

    const [gsearch, setGSearch] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 20;

    const { data: GenreData } = useQuery(GetAllGenere, {
        variables: {
            input: {
                take: 50,
                page: 1
            },
            search: gsearch
        }
    })

    const { data, subscribeToMore } = useQuery(GetAllMovies, {
        variables: {
            input: {
                take: itemsPerPage,
                page: page
            },
            search
        }
    })

    const onHandleGSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setGSearch(e.target.value);
    }

    const onHandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const { register, reset, formState: { errors }, handleSubmit, setValue, watch } = useForm<FormFields>({
        resolver: zodResolver(Movieschema),
        defaultValues: {
            genre_id: []
        }
    })

    const [mutate] = useMutation(CREATE_MOVIES)

    const onSubmit: SubmitHandler<FormFields> = (data) => {

        console.log(data)

        mutate({
            variables: {
                file: watch("file"),
                genreId: data.genre_id,
                input: {
                    description: data.description,
                    duration: data.duration,
                    name: data.name,
                    release_date: data.release_date,
                    year: parseInt(data.year)
                }
            },
            onCompleted: () => {
                toast.success("Successfully Created")
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
                    "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
                    "apollo-require-preflight": true
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
                        label='Movie Name'
                        name='name'
                    />

                    <Textarea
                        register={register}
                        error={errors.description}
                        isRequired={true}
                        label='Description'
                        name='description'
                        placeholder=''
                    />

                    <InputText
                        icon={false}
                        error={errors.duration}
                        register={register}
                        isRequired={true}
                        label='Duration'
                        name='duration'
                    />
                    <InputText
                        icon={false}
                        error={errors.year}
                        register={register}
                        isRequired={true}
                        label='Year'
                        name='year'
                    />
                    <InputCalendar
                        label='Release Date'
                        name='release_date'
                        setValue={setValue}
                        value={watch("release_date")}
                        error={errors.release_date as FieldError}
                        register={register}
                        isRequired={true}
                    />

                    <FileUpload
                        name='file'
                        register={register}
                        label='File Upload'
                        isRequired={true}
                        error={errors.file as FieldError}
                        setValue={setValue}
                        value={watch("file")}
                        accepted={{
                            "image/*":
                                [".png", ".jpg", ".jpeg", ".gif", ".bitmap", ".webp",
                                    ".tiff"
                                ]
                        }}
                    />

                    <SelectArray
                        label='Genre'
                        register={register}
                        error={errors.genre_id as FieldError}
                        onChange={onHandleGSearch}
                        isRequired={true}
                        name='genre_id'
                        value={watch("genre_id")}
                        setValue={setValue}
                        options={
                            (GenreData?.getAllGenre.item || []).map(({ genre_id, name }: { genre_id: string, name: string }) => ({
                                label: name,
                                value: genre_id
                            }))
                        }
                    />
                </>}
            />
            <div className={styles.body}>

                {isEmpty(data?.getAllMovies.item) ? <NoData /> : data?.getAllMovies.item.map(({ movies_id, name, description, url, duration, year, release_date, created_at }: MoviesInterface) => (
                    <MovieID key={movies_id} name={name}
                        movies_id={movies_id} description={description} url={url} duration={duration} year={year} release_date={release_date} created_at={created_at} />
                ))}

            </div>
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
