import Onboarding from '@/lib/ui/account/onboarding'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "onboarding"
}

export default function Page() {
    return (
        <div>
            <Onboarding />
        </div>
    )
}
