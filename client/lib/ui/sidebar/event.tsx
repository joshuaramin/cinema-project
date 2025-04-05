import React from 'react'
import styles from '@/styles/lib/ui/sidebar/event.module.scss';
import MiniCalendar from '@/components/calendar/miniCalendar';
import Calendar from '@/components/calendar/calendar';
import { OpenSansLight, OpenSansRegular, OpenSansSemiBold, VolkhovLight } from '@/lib/typography';
import { format } from 'date-fns'
import { TbCalendarEvent } from 'react-icons/tb';


const events = [
    {
        "id": 1,
        "name": "Tech Innovators Summit",
        "date": "2025-03-15",
        "location": "San Francisco, CA",
        "description": "A summit to showcase the latest in tech innovations, with keynotes from industry leaders.",
        "tags": ["technology", "innovation", "conference"]
    },
    {
        "id": 2,
        "name": "AI & Machine Learning Workshop",
        "date": "2025-04-10",
        "location": "New York, NY",
        "description": "Hands-on workshops to learn AI and ML basics and practical applications.",
        "tags": ["AI", "machine learning", "workshop"]
    },
    {
        "id": 3,
        "name": "Women in Tech Conference",
        "date": "2025-05-20",
        "location": "Seattle, WA",
        "description": "A gathering of women leaders in tech to discuss challenges, opportunities, and success stories.",
        "tags": ["diversity", "women in tech", "conference"]
    },
    {
        "id": 4,
        "name": "Startup Pitch Night",
        "date": "2025-06-01",
        "location": "Austin, TX",
        "description": "A night for startups to pitch their ideas to a panel of investors and get funding.",
        "tags": ["startups", "funding", "pitch"]
    },
    {
        "id": 5,
        "name": "Cybersecurity Awareness Forum",
        "date": "2025-07-15",
        "location": "Chicago, IL",
        "description": "Experts gather to discuss current cybersecurity threats and solutions.",
        "tags": ["cybersecurity", "forum", "awareness"]
    }

]

export default function Event() {
    return (
        <div className={styles.container}>
            {/* <MiniCalendar /> */}
            <Calendar />
        </div>
    )
}
