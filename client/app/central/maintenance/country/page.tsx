import React from 'react'
import Template from '@/lib/ui/central/template'
import { Metadata } from 'next'
import CountryPage from '@/lib/ui/central/maintenance/country/page'


export const metadata: Metadata = {
    title: "Maintenance | Country"
}

export default function Page() {
    return (
        <Template name='Country' goback={true}>
            <CountryPage />
        </Template>
    )
}
