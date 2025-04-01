import ShiftPage from '@/lib/ui/central/maintenance/shift/page'
import Template from '@/lib/ui/central/template'
import React from 'react'

export default function Page() {
    return (
        <Template name='Shift' goback={true}>
            <ShiftPage />
        </Template>
    )
}
