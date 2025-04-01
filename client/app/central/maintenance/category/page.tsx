import React from 'react'
import Template from '@/lib/ui/central/template'
import { Metadata } from 'next'
import CategoryPage from '@/lib/ui/central/maintenance/category/page'

export const metadata: Metadata = {
    title: "Maintenance | Category"
}

export default function Page() {
    return (
        <Template name='Category' goback={true}>
            <CategoryPage />
        </Template>
    )
}
