"use client"

import React from 'react'
import { ColorRing } from 'react-loader-spinner'


interface SpinnerProps {
    heigth: number
    width: number
}

export default function Spinner({ heigth, width }: SpinnerProps) {
    return (
        <div>
            <ColorRing
                colors={["#D6AA58", "#D6AA58", "#D6AA58", "#D6AA58", "#D6AA58"]}
                width={width}
                height={heigth}
            />
        </div>
    )
}
