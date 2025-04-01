import React, { FC, ReactNode, forwardRef } from 'react';
import styles from '@/styles/components/prompt.module.scss';
import { TbX } from 'react-icons/tb';
import { OpenSansSemiBold, VolkhovBold, VolkhovLight } from '@/lib/typography';

interface Props {
    title: string;
    body?: ReactNode;
    headerClose: boolean;
    submitBtn?: ReactNode;
    onClose: () => void;
    footer: boolean;
}

const Prompt: FC<Props> = forwardRef<HTMLDivElement, Props>(
    ({ body, onClose, headerClose, submitBtn, title, footer }, ref) => {

        const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        };
        return (
            <div ref={ref} className={styles.container} onClick={handleBackdropClick}>
                <div className={styles.promptContainer}>
                    <div className={styles.header}>
                        <h1 className={OpenSansSemiBold.className}>{title}</h1>
                        {headerClose && (
                            <button onClick={onClose}>
                                <TbX size={23} />
                            </button>
                        )}
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
            </div >
        );
    }
);

Prompt.displayName = 'Prompt';

export default Prompt;
