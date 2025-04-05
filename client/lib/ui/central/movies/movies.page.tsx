"use client"

import React, { useState } from 'react'
import CentralHeader from '../header'
import store from 'store2'

export default function MoviesPage() {

    const user = store.get("UserAccount");
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 20;

    return (
        <div>
            <CentralHeader
                title='Add New Movies' />
        </div>
    )
}
