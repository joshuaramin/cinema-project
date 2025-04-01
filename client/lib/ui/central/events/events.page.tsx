"use client"

import React, { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'
import CentralHeader from '../header'
import { useMutation } from '@apollo/client'
import { Create_Event } from '@/lib/apollo/mutation/events.mutation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EventsScehma } from '@/lib/validation/EventsSchema'
import { InputText } from '@/components/input'
import store from 'store2'

type EventsFields = {
    title: string
    description: string
    location: string
    startDate: any
    endDate: any
}

export default function EventPage() {


    const user = store.get("UserAccount")
    const [search, setSearch] = useState<string>("")


    const onHandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }


    const { handleSubmit, formState: { errors }, register, reset } = useForm<EventsFields>({
        resolver: zodResolver(EventsScehma)
    })

    const [mutate] = useMutation(Create_Event)

    const onHandleSubmit: SubmitHandler<EventsFields> = (data) => {
        mutate({
            variables: {
                userId: user?.user_id,
                input: {
                    title: data.title,
                    location: data.location,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    description: data.description
                }
            },
            onCompleted: () => {
                toast.success("Successfully Created")
                reset({
                    title: "",
                    description: "",
                    endDate: "",
                    location: "",
                    startDate: ""
                })
            }
        })
    }
    return (
        <div>
            <CentralHeader
                title='Add New Events'
                onChange={onHandleSearch}
                submitForm={handleSubmit(onHandleSubmit)}
                body={
                    <>
                        <InputText
                            icon={false}
                            register={register}
                            isRequired={true}
                            label='Title'
                            name='title'
                            type='text'
                            error={errors.title}
                        />
                        <InputText
                            icon={false}
                            register={register}
                            isRequired={true}
                            label='Event Location'
                            name='location'
                            type='text'
                            error={errors.location}
                        />

                    </>
                }
            />
        </div>
    )
}
