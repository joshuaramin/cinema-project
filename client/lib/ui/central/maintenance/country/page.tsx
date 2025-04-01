"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'
import MaintenaceHeader from '../header'
import styles from '@/styles/lib/ui/central/maintenance/body.module.scss';
import Pagination from '@/components/pagination';
import NoData from '@/components/nodata';
import Table from '@/components/table';
import { CountriesInterface, GetAllCountries } from '@/lib/apollo/query/country.query';
import { isEmpty } from 'lodash';
import { InputText } from '@/components/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { CountrySchema } from '@/lib/validation/CountrySchema';
import { useMutation, useQuery } from '@apollo/client';
import CountryID from './id';
import { Create_Country } from '@/lib/apollo/mutation/country.mutation';
import toast from 'react-hot-toast';
import { CountrySubscription } from '@/lib/apollo/subscription/country.subscriptions';

const thead = ["Country", "Code", "Date Created", "Actions"]

type FormFields = {
    country: string
    code: string
}

export default function CountryPage() {

    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const itemsPerPage = 20

    const { data, subscribeToMore } = useQuery(GetAllCountries, {
        variables: {
            input: {
                take: itemsPerPage,
                page: page
            },
            search: search
        }
    })

    const onHandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }


    const { register, formState: { errors }, handleSubmit } = useForm<FormFields>({
        resolver: zodResolver(CountrySchema)
    })


    const [mutate] = useMutation(Create_Country)

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        mutate({
            variables: {
                input: {
                    code: data.code,
                    country: data.country
                }
            },
            onCompleted: (data) => {
                if (data.create_country.country_id) {
                    toast.success("Successfully created");
                }
                if (data.create_country.message) {
                    toast.success(data.create_country.message)
                }
            }
        })
    }


    useEffect(() => {

        return subscribeToMore({
            document: CountrySubscription,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;


                const newCountry = subscriptionData.data.CountrySubscriptions

                return Object.assign({}, prev, {
                    getAllCountries: {
                        ...prev.getAllCountries,
                        item: [...prev.getAllCountries.item, newCountry]
                    }
                })
            }
        })
    }, [subscribeToMore])

    return (
        <div className={styles.container}>
            <MaintenaceHeader onChange={onHandleSearch}
                title={'Add New Country'}
                submitForm={handleSubmit(onSubmit)}
                body={<>
                    <InputText
                        icon={false}
                        isRequired={true}
                        label='Country'
                        name='country'
                        register={register}
                        error={errors.country}
                    />
                    <InputText
                        icon={false}
                        isRequired={true}
                        label='Code'
                        name='code'
                        error={errors.code}
                        register={register}
                    />
                </>}

            />
            <div className={styles.body}>
                {isEmpty(data?.getAllCountries?.item) ? <NoData /> :
                    <Table thead={thead} tbody={<>
                        {data?.getAllCountries.item.map(({ country_id, country, code, created_at }: CountriesInterface) => (
                            <CountryID key={country_id} country_id={country_id} code={code} created_at={created_at} country={country} />
                        ))}
                    </>} />
                }
            </div>
            <Pagination
                currentPage={page}
                hasNextPage={data?.getAllCountries?.hasNextPage}
                hasPrevPage={data?.getAllCountries?.hasPrevPage}
                totalItems={data?.getAllCountries?.totalItems}
                totalPage={data?.getAllCountries?.totalPages}
                pages={page}
                setPages={setPage}
            />
        </div>
    )
}
