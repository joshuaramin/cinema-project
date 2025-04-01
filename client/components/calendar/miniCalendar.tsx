"use client"

import React, { useState, useEffect } from 'react'
import styles from '@/styles/components/calendar/minicalendar.module.scss';
import { VolkhovBold, VolkhovLight } from '@/lib/typography';
import { months as Months } from './calendar.config';
import { generateDate } from './calendar.config';
import cn from '@/lib/util/cn';

type YearList = {
    years: number[]
}
export default function MiniCalendar() {

    const [months, setMonths] = useState(new Date().getMonth())
    const [years, setYears] = useState(new Date().getFullYear())
    const [yearList, setYearList] = useState<YearList>({ years: [] })


    useEffect(() => {
        const currentYear = new Date().getFullYear() + 1;

        const yearsInArray = Array.from({ length: 200 }, (_, i) => currentYear - 1 - i);

        setYearList({ years: yearsInArray })
    }, [])


    return (
        <div className={styles.container}>
            <h2 className={VolkhovBold.className}>{Months[months]} {years}</h2>
            <div className={styles.header}>
                <div className={styles.months}>
                    <select className={styles.selectMonths} value={months} onChange={(e) => setMonths(parseInt(e.target.value))}>
                        {Months.map((months, index) => (
                            <option key={index} value={index}>{months}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.years}>
                    <select value={years} onChange={(e) => setYears(parseInt(e.target.value))}  >
                        {yearList.years.map((year, index) => (
                            <option key={index} value={index}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.body}>
                {generateDate(months, years).map(({ date, today }, index) => (
                    <div key={index}>
                        <button className={cn(today ? `${styles.active}` : '')}>
                            <span>{date.date()}</span>
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles.footer}>
                <button
                    onClick={() => {
                        setMonths(new Date().getMonth())
                        setYears(new Date().getFullYear())
                    }}
                    className={styles.today}>
                    <span>Today</span>
                </button>
                <button>
                    <span>Clear</span>
                </button>
            </div>
        </div>
    )
}
