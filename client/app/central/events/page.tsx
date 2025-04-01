import EventPage from '@/lib/ui/central/events/events.page'
import Template from '@/lib/ui/central/template'
import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
    title: "Events"
}

export default function Page() {
    return (
        <Template goback={false} name='Events'>
            <EventPage />
        </Template>
    )
}
