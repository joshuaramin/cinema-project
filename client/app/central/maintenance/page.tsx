import MaintenanceIndex from '@/lib/ui/central/maintenance'
import Template from '@/lib/ui/central/template'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Maintenance"
}

export default function Page() {
    return (
        <Template name='Maintenance' goback={false}>
            <MaintenanceIndex />
        </Template>
    )
}
