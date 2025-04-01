"use client"

import React, { useState } from 'react'
import TableStyles from '@/styles/components/table.module.scss';
import Prompt from '@/components/prompt/prompt';
import { VolkhovLight } from '@/lib/typography'
import { format } from 'date-fns'
import { TbEdit, TbTrash } from 'react-icons/tb';
import { ButtonDelete, ButtonPrimary } from '@/components/button';
import { PositionInterface } from '@/lib/apollo/query/position.query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputText } from '@/components/input';
import { Update_Position, Delete_Position } from '@/lib/apollo/mutation/position.mutation';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';

type PositionField = {
    position_id?: string
    position?: string
}

export default function PositionID({ position_id, position, user, created_at }: PositionInterface) {

    const [editToggle, setEditToggle] = useState<boolean>(false);
    const [deleteToggle, setDeleteToggle] = useState<boolean>(false);

    const onHandleEditToggle = () => {
        setEditToggle(() => !editToggle)
    }

    const onHandleDeleteToggle = () => {
        setDeleteToggle(() => !deleteToggle)
    }


    const [EditMutate] = useMutation(Update_Position);
    const [DeleteMutate] = useMutation(Delete_Position);

    const { handleSubmit: EditHandleSubmit, formState: { errors }, register } = useForm<PositionField>({
        values: {
            position: position
        }
    })
    const { handleSubmit: DeleteHandleSubmit } = useForm<PositionField>({
        values: {
            position_id: position_id
        }
    })


    const onEditSubmit: SubmitHandler<PositionField> = (data) => {
        EditMutate({
            variables: {
                input: {
                    position: data.position
                },
                positionId: position_id
            },
            update: (cache, { data: EditMutationdata }) => {
                const updatePosition = EditMutationdata?.update_position;

                if (updatePosition) {
                    cache.modify({
                        fields: {
                            getAllPosition(existingData = {}, { readField }) {
                                return {
                                    ...existingData,
                                    item: existingData.item.map((positionRef: any) => readField("position_id", positionRef) === updatePosition.position_id ? updatePosition : positionRef)
                                }
                            }
                        }
                    });
                } else {
                    console.error("Update position data is missing required fields")
                }
            },
            onCompleted: (data) => {
                if (data.update_position.position_id) {
                    toast.success("Successfully updated")
                }
                if (data.update_position.message) {
                    toast.error(data.update_position.message)
                }
            }
        })
    }

    const onDeleteSubmit: SubmitHandler<PositionField> = (data) => {
        DeleteMutate({
            variables: {
                positionId: data.position_id
            },
            update: (cache, { data: DeleteMutationData }) => {
                const deletePositionId = DeleteMutationData?.delete_position?.position_id;

                if (deletePositionId) {
                    cache.modify({
                        fields: {
                            getAllPosition(existingData = {}, { readField }) {

                                return {
                                    ...existingData,
                                    item: existingData.item.filter((positionRef: any) =>
                                        readField("position_id", positionRef) !== deletePositionId
                                    )
                                }
                            }
                        }
                    })
                }
            },
            onCompleted: () => {
                toast.success("Successfully deleted")
            }
        })
    }


    return (
        <tr key={position_id}>
            <td className={VolkhovLight.className}>{position}</td>
            <td className={VolkhovLight.className}>{user?.profile?.first_name} {user?.profile?.last_name}</td>
            <td className={VolkhovLight.className}>{format(new Date(created_at), "MMMM dd, yyyy")}</td>
            <td>
                {
                    editToggle && <Prompt
                        title={`Edit Category`}
                        body={
                            <>
                                <InputText
                                    icon={false}
                                    register={register}
                                    label='Position'
                                    name='position'
                                    error={errors.position}
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
                <div className={TableStyles.actionbtn}  >
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
