"use client"

import React, { useState } from 'react'
import TableStyles from '@/styles/components/table.module.scss';
import Prompt from '@/components/prompt/prompt';
import { VolkhovLight } from '@/lib/typography'
import { format } from 'date-fns'
import { TbEdit, TbTrash } from 'react-icons/tb';
import { ButtonDelete, ButtonPrimary } from '@/components/button';
import { InputText } from '@/components/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { Delete_Category, Update_Category } from '@/lib/apollo/mutation/category.mutation';
import toast from 'react-hot-toast';

type CountryField = {
    category_id?: string
    category?: string
}


export default function CategoryID({ category_id, category, user, created_at }: {
    category_id: string,
    category: string,
    user: any,
    created_at: any
}) {


    const [editToggle, setEditToggle] = useState<boolean>(false);
    const [deleteToggle, setDeleteToggle] = useState<boolean>(false);

    const onHandleEditToggle = () => {
        setEditToggle(() => !editToggle)
    }

    const onHandleDeleteToggle = () => {
        setDeleteToggle(() => !deleteToggle)
    }


    const [EditMutate] = useMutation(Update_Category);
    const [DeleteMutate] = useMutation(Delete_Category);

    const { handleSubmit: EditHandleSubmit, formState: { errors }, register } = useForm<CountryField>({
        values: {
            category: category
        }
    })


    const { handleSubmit: DeleteHandleSubmit } = useForm<CountryField>({
        values: {
            category_id: category_id
        }
    })

    const onEditSubmit: SubmitHandler<CountryField> = (data) => {
        EditMutate({
            variables: {
                input: {
                    category: data.category
                },
                categoryId: category_id,
            },
            update: (cache, { data: EditMutationdata }) => {
                const updatedCategory = EditMutationdata?.update_category;
                if (updatedCategory) {
                    cache.modify({
                        fields: {
                            getAllCategories(existingData = {}, { readField }) {

                                return {
                                    ...existingData,
                                    item: existingData.item.map((categoryRef: any) =>
                                        readField("category_id", categoryRef) === updatedCategory.category_id
                                            ? updatedCategory
                                            : categoryRef
                                    ),
                                };
                            },
                        },
                    });
                } else {
                    console.error("Updated category data is missing required fields.");
                }
            },
            onCompleted: (data) => {
                if (data.update_category.category_id) {
                    toast.success("Successfully updated")
                }
                if (data.update_category.message) {
                    toast.error(data.update_category.message)
                }
            }
        })
    }

    const onDeleteSubmit: SubmitHandler<CountryField> = (data) => {
        DeleteMutate({
            variables: {
                categoryId: data.category_id
            },
            update: (cache, { data: DeleteMutationData }) => {
                const deleteCategoryId = DeleteMutationData?.delete_category?.category_id;

                if (deleteCategoryId) {
                    cache.modify({
                        fields: {
                            getAllCategories(existingData = {}, { readField }) {
                                return {
                                    ...existingData,
                                    item: existingData.item.filter((categoryRef: any) =>
                                        readField("category_id", categoryRef) !== deleteCategoryId
                                    ),
                                };
                            },
                        },
                    });
                }
            },
            onCompleted: () => {
                toast.success("Successfully deleted")
            }
        })
    }
    return (
        <tr key={category_id}>
            <td className={VolkhovLight.className}>{category}</td>
            <td className={VolkhovLight.className}>{user?.profile?.first_name} {user?.profile?.last_name}</td>
            <td className={VolkhovLight.className}>{format(new Date(created_at), "MMMM dd, yyy")}</td>
            <td className={VolkhovLight.className}>
                {
                    editToggle && <Prompt
                        title={`Edit Category`}
                        body={
                            <>
                                <InputText
                                    icon={false}
                                    register={register}
                                    label='Category'
                                    name='category'
                                    error={errors.category}
                                    isRequired={true}

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
                        title={`Delete Category`}
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
