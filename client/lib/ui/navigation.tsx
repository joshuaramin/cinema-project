import React from 'react'
import styles from '@/styles/lib/ui/navigaton.module.scss';
import { TbX } from 'react-icons/tb';
import { Links } from '@/components/Link';


interface Props {
    onClose: () => void
}

export default function HeaderNavigation({ onClose }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.navigator}>
                <div className={styles.header}>
                    <button onClick={onClose}>
                        <TbX size={18} />
                    </button>
                </div>
                <div className={styles.body}>
                    <Links name={'Documentations'} url='/documentations' />
                    <Links name={'Case Studies'} url='/case-studies' />
                    <Links name={'About Us'} url='/about-us' />
                    <Links name={'Careers'} url='/careers' />
                    <Links name={'Blog Post'} url='/blog-post' />
                </div>
            </div>

        </div>
    )
}
