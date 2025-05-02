"use client"

import { MoviesInterface } from '@/lib/apollo/query/movies.query';
import { ConvertISODuration } from '@/lib/util/utils';
import { format } from 'date-fns';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import styles from '@/styles/lib/ui/central/movies/id.module.scss'
import cn from '@/lib/util/cn';
import { VolkhovBold, VolkhovLight } from '@/lib/typography';
import { useRouter } from 'next/navigation';

type MoviesField = {
    movies_id: string
    name: string
    year: number,
    release_date: any
}

export default function MovieID({ movies_id, name, description, duration, release_date, url, year, created_at }: MoviesInterface) {

    const router = useRouter();

    const [editToggle, setEditToggle] = useState<boolean>(false);
    const [deleteToggle, setDeleteToggle] = useState<boolean>(false);

    const onHandleEditToggle = () => {
        setEditToggle(() => !editToggle)
    }


    const onHandleDeleteToggle = () => {
        setDeleteToggle(() => !deleteToggle)
    }

    const { handleSubmit: EditHandleSubmit, formState: { errors }, register } = useForm()
    const { handleSubmit: DeleteHandleSubmit } = useForm();


    const onEditSubmit: SubmitHandler<MoviesField> = (data) => {

    }


    const onDeleteSubmit: SubmitHandler<MoviesField> = (data) => {


    }

    const onHandleRoute = () => {
        router.push(`/central/movies/${movies_id}`)
    }


    return (
        <div onClick={onHandleRoute} className={styles.container}>
            <div className={styles.card}>
                <Image src={url} alt={name} objectFit='cover' layout='fill' />
            </div>
            <span className={cn(VolkhovBold.className)}>{name}</span>
        </div>
    )
}
