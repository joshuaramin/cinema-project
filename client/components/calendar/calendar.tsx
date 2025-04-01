"use client"

import React, { useState } from 'react'
import styles from '@/styles/components/calendar/calendar.module.scss';
import { days, generateDate } from './calendar.config';
import { months } from './calendar.config';
import { VolkhovLight } from '@/lib/typography';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import dayjs from 'dayjs';
import cn from '@/lib/util/cn';


export default function Calendar() {


    const currentDate = dayjs()

    const [today, setToday] = useState(currentDate)



    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={VolkhovLight.className}>
                    {months[today.month()]} {today.year()}</h2>

                <div className={styles.btngrp}>
                    <button onClick={() => setToday(today.month(today.month() - 1))}>
                        <TbChevronLeft size={20} />
                    </button>

                    <button onClick={() => setToday(today.month(today.month() + 1))}>
                        <TbChevronRight size={20} />
                    </button>
                </div>
            </div>
            <div className={styles.body}>
                {days.map((day) => <span key={day} className={VolkhovLight.className}>{day}</span>)}
                {generateDate(today.month(), today.year()).map(({ date, today }, index) => (
                    <div key={index} className={styles.card}>
                        <button className={cn(today ? `${styles.active}` : '')}>{date.date()}</button>
                    </div>
                ))}
            </div>
        </div >
    )
}
