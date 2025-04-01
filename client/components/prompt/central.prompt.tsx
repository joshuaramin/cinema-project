import React, { FC, forwardRef, ReactNode } from 'react'
import styles from '@/styles/components/centralPrompt.module.scss';
import { TbX } from 'react-icons/tb';
import { OpenSansSemiBold, VolkhovLight } from '@/lib/typography';




interface Props {
    title: string;
    body?: ReactNode;
    headerClose: boolean;
    submitBtn?: ReactNode;
    onClose: () => void;
    footer: boolean;
}

const CentralPrompt: FC<Props> = forwardRef<HTMLDivElement, Props>(({ footer, headerClose, onClose, title, body, submitBtn }, ref) => {


    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };


    return (
        <div ref={ref} onClick={handleBackdropClick} className={styles.container}>
            <div className={styles.promptContainer}>
                <div className={styles.header}>
                    <h1 className={OpenSansSemiBold.className}>{title}</h1>
                    {headerClose && (
                        <button onClick={onClose}>
                            <TbX size={23} />
                        </button>)
                    }
                </div>
                <div className={styles.body}>{body}</div>
                {footer && (
                    <div className={styles.footer}>
                        <button onClick={onClose} className={styles.cancelBtn}>
                            <span className={VolkhovLight.className}>Cancel</span>
                        </button>
                        {submitBtn}
                    </div>
                )}
            </div>

        </div>
    )
})

CentralPrompt.displayName = "CentralPrompt"

export default CentralPrompt