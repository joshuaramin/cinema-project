import UserRolesPages from '@/lib/ui/central/maintenance/user-roles/page'
import Template from '@/lib/ui/central/template'
import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
    title: "Maintenance | User Roles"
}
export default function Page() {
    return (
        <Template name='User Roles' goback={true}>
            <UserRolesPages />
        </Template>
    )
}
