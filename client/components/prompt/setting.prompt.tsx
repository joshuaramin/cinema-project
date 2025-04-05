import React, { FC, forwardRef } from 'react'
import styles from '@/styles/lib/ui/sidebar/Profile/settings.module.scss';
import { ButtonLink } from '../Link';
import { TbBellRinging2, TbCreditCard, TbShieldLock, TbUser } from 'react-icons/tb';
import { OpenSansSemiBold } from '@/lib/typography';

interface Props {
    onClose: () => void
}


const SettingsPrompt: FC<Props> = forwardRef<HTMLDivElement, Props>(({ onClose }, ref) => {

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div onClick={handleBackdropClick} className={styles.container}>
            <div className={styles.settingsContainer}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <span className={OpenSansSemiBold.className}>Account</span>
                    </div>
                    <ButtonLink icon={TbUser} name='Profile' url='/' />
                    <ButtonLink icon={TbShieldLock} name='Security' url='/' />
                    <ButtonLink icon={TbCreditCard} name='Payments and Billings' url='/' />
                    <ButtonLink icon={TbBellRinging2} name='Notifications' url='/' />
                </div>
            </div>
        </div>
    )
})


export default SettingsPrompt