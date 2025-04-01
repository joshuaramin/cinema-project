import React from 'react'
import { Metadata } from 'next'
import Template from '@/lib/ui/central/template'

export const metadata: Metadata = {
    title: "Media"
}

export default function Page() {
    return (
        <Template name='Media' goback={false}>
            <span>Test</span>
        </Template>
    )
}
