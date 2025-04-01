import React from 'react'
import styles from '@/styles/components/pagination.module.scss';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import { OpenSansRegular, OpenSansSemiBold } from '@/lib/typography';


interface PaginationProps {
    totalItems: number
    totalPage: number
    hasNextPage: boolean
    currentPage: number
    hasPrevPage: number
    pages: number
    setPages: any
}
export default function Pagination({ totalItems, totalPage, currentPage, hasNextPage, hasPrevPage, pages, setPages }: PaginationProps) {


    const onHandleNextPage = () => {
        setPages(() => pages + 1)
    }

    const onHandlePrevPage = () => {
        setPages(() => pages - 1)
    }

    return (
        <div className={styles.container}>
            <div>
                <span className={OpenSansSemiBold.className}>Showing {currentPage} of {totalPage} of {totalItems} entries </span>
            </div>
            <div className={styles.btn}>
                <button onClick={onHandlePrevPage} disabled={hasPrevPage ? false : true} >
                    <TbChevronLeft size={18} />
                </button>
                <span className={OpenSansSemiBold.className}>{pages} out of {totalPage}</span>
                <button onClick={onHandleNextPage} disabled={hasNextPage ? false : true}>
                    <TbChevronRight size={18} />
                </button>
            </div>
        </div>
    )
}
