"use client"

import { ButtonLink } from '@/components/Link'
import React, { useEffect, useState } from 'react'
import { TbAdjustmentsHorizontal, TbChartBar, TbLayoutDashboard, TbMovie, TbSettings, TbTicket } from 'react-icons/tb'
import store from 'store2'


interface User {
    user_role: {
        name: string
    }
}

export default function SidebarURL() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = store.get("UserAccount");
        setUser(storedUser)
    }, [])

    const SidebarURLList = [
        {
            name: "Overview", url: "/central/overview",
            role: ["Administrator"], icon: TbLayoutDashboard
        },
        {
            name: "Movies", url: "/central/movies",
            role: ["Administrator", "User"], icon: TbMovie
        },
        {
            name: "Tickets", url: "/central/tickets",
            role: ["Administrator"], icon: TbTicket
        },
        {
            name: "Analytics", url: "/central/analytics",
            role: ["Administrator"], icon: TbChartBar
        },
        {

            name: "Maintenance", url: "/central/maintenance",
            role: ["Administrator"], icon: TbAdjustmentsHorizontal
        },

    ]

    if (!user) {
        return (<div></div>)
    }

    const filteredSidebarItems = SidebarURLList.filter(({ role }) =>
        role.includes(user?.user_role?.name)
    );

    return (

        <>
            {filteredSidebarItems.map(({ name, url, icon }) => (
                <ButtonLink key={name} name={name} url={url} icon={icon} />
            ))}
        </>

    )
}
