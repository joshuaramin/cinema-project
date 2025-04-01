
import React from 'react'
import Template from '@/lib/ui/central/template'
import { Metadata } from 'next'
import PositionPage from '@/lib/ui/central/maintenance/position/page'


export const metadata: Metadata = {
    title: "Maintenance | Position"
}
export default function Page() {
    return (
        <Template name='Position' goback={true}>
            <PositionPage />
        </Template>
    )
}
