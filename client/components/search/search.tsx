"use client"


import React, { useState, useEffect, useRef } from 'react'
import styles from '@/styles/components/search/search.module.scss'
import { TbAlt, TbSlash } from 'react-icons/tb'
import SearchPrompt from './search.prompt';

export default function Search() {

    const [toggle, setToggle] = useState(false);

    const toggleRef = useRef<HTMLDivElement>(null)

    const onHandleToggle = () => {
        setToggle(() => !toggle)
    }

    const onHandleEsc = (e: KeyboardEvent) => {
        if (e.ctrlKey) {
            alert("Hello world 1")
        }
    }
    useEffect(() => {
        // Close toggle when clicking outside the component
        const handleClickOutside = (event: MouseEvent) => {
            if (toggleRef.current && !toggleRef.current.contains(event.target as Node)) {
                setToggle(false);
            }
        };

        // Handle Ctrl+K shortcut
        const handleEsc = (e: KeyboardEvent) => {
            if (e.altKey && e.key === "/") {
                onHandleToggle()
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);


    return (
        <div className={styles.container}>
            {
                toggle && <SearchPrompt close={onHandleToggle} />
            }
            <div className={styles.search}>
                <input onClick={onHandleToggle} type="text" placeholder='Search' />
                <div className={styles.grp}>
                    <div className={styles.btn}>
                        <TbAlt size={20} />
                    </div>
                    <div className={styles.btn}>
                        <TbSlash size={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}
