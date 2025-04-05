import MoviesPage from '@/lib/ui/central/movies/movies.page'
import Template from '@/lib/ui/central/template'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Movies"
}

export default function Page() {
    return (
        <Template name='Movies' goback={false}>
            <MoviesPage />
        </Template>
    )
}
