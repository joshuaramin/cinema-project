import { getClient } from '@/lib/apollo/apolloClient'
import { GetUserRolesBySlug } from '@/lib/apollo/query/role.query'
import UserRoleID from '@/lib/ui/central/maintenance/user-roles/id'
import Template from '@/lib/ui/central/template'
import React from 'react'

type Props = {
    params: { id: string }
}

export async function generateMetadata({ params }: Props) {

    const { id } = await params

    const data = await getClient().query({
        query: GetUserRolesBySlug,
        variables: {
            slug: id
        }
    })
    return {
        title: data?.data.getUserRoleBySlug.name
    }
}

export default async function Page({ params }: Props) {

    const { id } = await params

    const data = await getClient().query({
        query: GetUserRolesBySlug,
        variables: {
            slug: id
        }
    })

    return (
        <Template name={`${data?.data.getUserRoleBySlug.name}`} goback={true}>
            <UserRoleID />
        </Template>
    )
}
