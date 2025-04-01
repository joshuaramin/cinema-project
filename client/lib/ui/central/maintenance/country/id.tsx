"use client"


import React, { useState } from 'react'
import TableStyles from '@/styles/components/table.module.scss';
import Prompt from '@/components/prompt/prompt';
import { VolkhovLight } from '@/lib/typography'
import { format } from 'date-fns'
import { TbEdit, TbTrash } from 'react-icons/tb';
import { ButtonDelete, ButtonPrimary } from '@/components/button';
import { CountriesInterface } from '@/lib/apollo/query/country.query';
import { useMutation } from '@apollo/client';
import { Delete_Country, Update_Country } from '@/lib/apollo/mutation/country.mutation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputText } from '@/components/input';
import toast from 'react-hot-toast';


type CountryField = {
    country_id?: string
    country?: string
    code?: string
}

export default function CountryID({ country_id, code, country, created_at }: CountriesInterface) {

    const [editToggle, setEditToggle] = useState<boolean>(false);
    const [deleteToggle, setDeleteToggle] = useState<boolean>(false);

    const onHandleEditToggle = () => {
        setEditToggle(() => !editToggle)
    }

    const onHandleDeleteToggle = () => {
        setDeleteToggle(() => !deleteToggle)
    }


    const [EditMutate] = useMutation(Update_Country);
    const [DeleteMutate] = useMutation(Delete_Country);

    const { handleSubmit: EditHandleSubmit, formState: { errors }, register } = useForm<CountryField>({
        values: {
            country: country,
            code: code
        }
    })


    const { handleSubmit: DeleteHandleSubmit } = useForm<CountryField>({
        values: {
            country_id: country_id
        }
    })


    const onEditSubmit: SubmitHandler<CountryField> = (data) => {
        EditMutate({
            variables: {
                countryId: country_id,
                input: {
                    country: data.country,
                    code: data.code
                }
            },
            update: (cache, { data: EditMutationdata }) => {
                const updateCountry = EditMutationdata?.update_country;
                if (updateCountry) {
                    cache.modify({
                        fields: {
                            getAllCountries(existingData = {}, { readField }) {

                                return {
                                    ...existingData,
                                    item: existingData.item.map((countryRef: any) =>
                                        readField("country_id", countryRef) === updateCountry.country_id ? updateCountry : countryRef)
                                }
                            }
                        }
                    })
                }
                else {
                    console.error("Updated coutnry data is muissing required fields.")
                }
            },
            onCompleted: (data) => {
                if (data.update_country.country_id) {
                    toast.success("Successfully updated");
                }
                if (data.update_country.message) {
                    toast.error(data.update_country.message);
                }
            }
        })
    }

    const onDeleteSubmit: SubmitHandler<CountryField> = (data) => {
        DeleteMutate({
            variables: {
                countryId: country_id
            },
            update: (cache, { data: DeleteMutationData }) => {
                const deleteCountryId = DeleteMutationData?.delete_country?.country_id;

                if (deleteCountryId) {
                    cache.modify({
                        fields: {
                            getAllCountries(existingData = {}, { readField }) {
                                return {
                                    ...existingData,
                                    item: existingData.item.filter((countryRef: any) => readField("country_id", countryRef) !== deleteCountryId)
                                }
                            }
                        },
                    })
                }
            },
            onCompleted: () => {
                toast.success("Successfully deleted")
            }
        })
    }

    return (
        <tr key={country_id}>
            <td className={VolkhovLight.className}>{country}</td>
            <td className={VolkhovLight.className}>{code}</td>
            <td className={VolkhovLight.className}>{format(new Date(created_at), "MMMM dd, yyy")}</td>
            <td className={VolkhovLight.className}>
                {
                    editToggle && <Prompt
                        title={`Edit Country`}
                        body={
                            <>
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
                            </>
                        }
                        headerClose={false}
                        footer={true}
                        onClose={onHandleEditToggle}
                        submitBtn={
                            <>
                                <form onSubmit={EditHandleSubmit(onEditSubmit)} >
                                    <ButtonPrimary name='Confirm' type='submit' />
                                </form>
                            </>
                        }
                    />
                }
                {
                    deleteToggle && <Prompt
                        title={`Delete Country`}
                        headerClose={false}
                        footer={true}
                        onClose={onHandleDeleteToggle}
                        body={<>
                            <span className={VolkhovLight.className}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim nisi ex nesciunt! Illum animi dolor molestiae. Aliquid libero saepe nihil!
                            </span>
                        </>}
                        submitBtn={
                            <>
                                <form onSubmit={DeleteHandleSubmit(onDeleteSubmit)}>
                                    <ButtonDelete name='Delete' />
                                </form>
                            </>
                        }
                    />
                }
                <div className={TableStyles.actionbtn}>
                    <button onClick={onHandleEditToggle} className={TableStyles.edit}>
                        <TbEdit size={18} />
                    </button>
                    <button onClick={onHandleDeleteToggle} className={TableStyles.trash}>
                        <TbTrash size={18} />
                    </button>
                </div>
            </td>
        </tr>
    )
}
