"use client"

import React from 'react'
import { ColorRing } from 'react-loader-spinner'


interface SpinnerProps {
    heigth: number
    width: number
    color?: string[]
}

export default function Spinner({ color, heigth, width }: SpinnerProps) {
    return (
        <div>
            <ColorRing
                colors={color ? color as [string, string, string, string, string] : ["#003B5C", "#003B5C", "#003B5C", "#003B5C", "#003B5C"]}
                width={width}
                height={heigth}
            />
        </div>
    )
}
