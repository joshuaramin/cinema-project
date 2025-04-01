import React, { FC, forwardRef, useEffect, useRef } from 'react'
import styles from '@/styles/components/search/searchPrompt.module.scss'
import { OpenSansRegular, OpenSansSemiBold } from '@/lib/typography'
import NoData from '../nodata'

interface Props {
    close: () => void
}


const SearchPrompt: FC<Props> = forwardRef<HTMLDivElement, Props>(
    ({ close }, ref) => {


        const inputRef = useRef<HTMLInputElement>(null);


        const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) {
                close();
            }
        };

        useEffect(() => {

            if (inputRef.current) {
                inputRef.current?.focus()
            }
            const handleEsc = (e: KeyboardEvent) => {
                if (e.code === "Escape") {
                    close()
                }
            };

            window.addEventListener("keydown", handleEsc)


            return () => window.removeEventListener("keydown", handleEsc)
        }, [])

        return (
            <div onClick={handleBackdropClick} ref={ref} className={styles.container}>
                <div className={styles.searchPromptContainer}>
                    <div className={styles.searchHeader}>
                        <input placeholder="What are you looking for?" type="text" ref={inputRef} />
                        <div className={styles.searchEsc}>
                            <span onKeyDown={close} className={OpenSansSemiBold.className}>ESC</span>
                        </div>
                    </div>
                    <div className={styles.searchBody}>
                        <NoData />
                    </div>
                    <div className={styles.searchFooter}></div>
                </div>
            </div>
        )
    }
)

SearchPrompt.displayName = "SearchPrompt"

export default SearchPrompt
