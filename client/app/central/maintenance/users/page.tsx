import UsersPage from '@/lib/ui/central/maintenance/users/page'
import Template from '@/lib/ui/central/template'
import React from 'react'

export default function Page() {
    return (
        <Template name='Users' goback={true}>
            <UsersPage />
        </Template>
    )
}
