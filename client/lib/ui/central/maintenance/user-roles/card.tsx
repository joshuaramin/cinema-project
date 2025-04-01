import React from 'react'
import styles from "@/styles/lib/ui/central/maintenance/user-roles/card.module.scss";
import { OpenSansRegular, OpenSansSemiBold } from '@/lib/typography';
import { RoleInterface } from '@/lib/apollo/query/role.query';
import { ButtonRoute } from '@/components/button';

export default function Card({ name, slug, user }: RoleInterface) {

    return (
        <div className={styles.container}>
            <div className={styles.cardHeader}>
                <h2 className={OpenSansSemiBold.className}>{name}</h2>
            </div>
            <div className={styles.cardBody}>
                {user.map(({ profile: { profile_id, first_name, last_name } }) => (
                    <div className={styles.profileCard} key={profile_id}>
                        <span className={OpenSansSemiBold.className}>{first_name[0]}{last_name[0]}</span>
                        <div className={styles.hovername}>
                            <span className={OpenSansSemiBold.className}>{first_name} {last_name}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.cardFooter}>
                <ButtonRoute name='Permission Settings' url={`/central/maintenance/user-roles/${slug}`} />
            </div>
        </div>
    )
}
