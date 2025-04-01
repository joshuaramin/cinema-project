"use client"


import React, { useState } from 'react'
import TableStyles from '@/styles/components/table.module.scss';
import { ShiftInterface } from '@/lib/apollo/query/shift.query'
import { VolkhovLight } from '@/lib/typography'
import { format } from 'date-fns'
import { TbEdit, TbTrash } from 'react-icons/tb';

export default function ShiftID({ user, shift_id, type, created_at }: ShiftInterface) {


    const [editToggle, setEditToggle] = useState<boolean>(false);
    const [deleteToggle, setDeleteToggle] = useState<boolean>(false);


    const onHandleEditToggle = () => {
        setEditToggle(() => !editToggle)
    }

    const onHandleDeleteToggle = () => {
        setDeleteToggle(() => !deleteToggle)
    }
    return (
        <tr>
            <td className={VolkhovLight.className}>
                {type}
            </td>
            <td className={VolkhovLight.className}>{user.profile.first_name} {user.profile.last_name}</td>
            <td className={VolkhovLight.className}>{format(new Date(created_at), "MMMM dd, yyy")}</td>
            <td className={VolkhovLight.className}>
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
