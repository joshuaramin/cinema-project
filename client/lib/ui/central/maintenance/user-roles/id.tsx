"use client"

import { GetAllGroup, GroupInterface } from '@/lib/apollo/query/group.query'
import { OpenSansSemiBold, VolkhovLight } from '@/lib/typography'
import { useQuery, useMutation } from '@apollo/client'
import styles from '@/styles/lib/ui/central/maintenance/user-roles/id.module.scss'
import React, { useEffect, useState } from 'react'
import { TbCaretRightFilled, TbPlus, TbTrash } from 'react-icons/tb'
import Spinner from '@/components/spinner'
import { GetUserRolesBySlug } from '@/lib/apollo/query/role.query'
import { useParams } from 'next/navigation'
import cn from '@/lib/util/cn'
import { AddRemoveUserRolePermission } from '@/lib/apollo/mutation/user_roles.mutation'
import toast from 'react-hot-toast'
import ToastNotification from '@/components/toastNotification'


type FormField = {
    user_role_id: string
    permission: string[]
}

export default function UserRoleID() {

    const router = useParams();
    const [search, setSearch] = useState("")

    const { data, loading } = useQuery(GetAllGroup, {
        variables: {
            search
        },
        fetchPolicy: "network-only"
    })


    const { data: PermissionData } = useQuery(GetUserRolesBySlug, {
        variables: {
            slug: router.id
        },
        fetchPolicy: "network-only",
    })
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [removedPermissions, setRevemodPermissions] = useState<string[]>([])


    useEffect(() => {
        if (PermissionData?.getUserRoleBySlug?.permission) {
            const permissions = PermissionData.getUserRoleBySlug.permission.map(
                ({ permission_id }: { permission_id: string }) => permission_id
            );
            setSelectedPermissions(permissions);
        }
    }, [PermissionData]);


    const [mutate] = useMutation(AddRemoveUserRolePermission)


    const handlePermission = (permission_id: string) => {
        setSelectedPermissions((prev) =>
            prev.includes(permission_id)
                ? prev.filter((id) => id !== permission_id)
                : [...prev, permission_id]
        );
    };


    return (
        <div className={styles.container}>
            <div className={styles.group_container}>
                {loading ? <Spinner heigth={30} width={30} /> :
                    data?.getAllGroup.map(({ group_id, name, permission }: GroupInterface) => (
                        <div className={styles.group_card} key={group_id}>
                            <div className={styles.group_header}>
                                <TbCaretRightFilled size={20} />
                                <h2 className={OpenSansSemiBold.className}>{name}</h2>
                            </div>
                            <div className={styles.group_body}>
                                <div>
                                    {permission.map(({ type, permission_id }) => (
                                        <div className={styles.permissioncard} key={permission_id}>
                                            <span className={VolkhovLight.className}>{type}</span>
                                            <div className={styles.grp}>
                                                {selectedPermissions.includes(permission_id) ?

                                                    <button
                                                        onClick={() => {
                                                            removedPermissions.push(permission_id);
                                                            setSelectedPermissions((prev) => {
                                                                if (prev.includes(permission_id)) {

                                                                    return prev.filter((id) => id !== permission_id);
                                                                } else {
                                                                    return [...prev, permission_id];
                                                                }
                                                            });
                                                        }}
                                                        className={styles.remove}>
                                                        <TbTrash size={18} />
                                                    </button> :

                                                    <button onClick={() => handlePermission(permission_id)} className={cn(styles.add, OpenSansSemiBold.className)} value={permission_id}>
                                                        <TbPlus size={18} />
                                                    </button>}


                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className={styles.formContainer}>
                <button className={VolkhovLight.className} onClick={() => {

                    mutate({
                        variables: {
                            add: selectedPermissions,
                            removed: removedPermissions,
                            userRoleId: PermissionData?.getUserRoleBySlug?.user_role_id,
                        },
                        onCompleted: () => {
                            toast.success("Successfully permission updated")

                            if (removedPermissions.length >= 1) {
                                setRevemodPermissions([])
                            }
                        }
                    })

                }}>Save</button>
            </div>
            <ToastNotification />
        </div >
    )
}
