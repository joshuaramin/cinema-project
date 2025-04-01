import React, { ReactNode } from 'react'
import styles from '@/styles/components/table.module.scss';
import { OpenSansSemiBold } from '@/lib/typography';
import NoData from './nodata';

interface TableProps {
    thead: string[]
    tbody: ReactNode
}

export default function Table({ thead, tbody }: TableProps) {
    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        {thead.map((head) => (
                            <th className={OpenSansSemiBold.className} key={head}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
        </div>
    )
}
