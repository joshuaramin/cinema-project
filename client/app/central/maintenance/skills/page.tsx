import React from 'react'
import SkillPage from '@/lib/ui/central/maintenance/skills/page'
import Template from '@/lib/ui/central/template'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Maintenance | Skills"
}

export default function Page() {
    return (
        <Template name='Skills' goback={true}>
            <SkillPage />
        </Template>
    )
}
