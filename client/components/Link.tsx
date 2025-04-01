
import React from 'react'
import Link from 'next/link'
import styles from '@/styles/components/a.module.scss';
import { IconType } from 'react-icons';
import { OpenSansRegular, OpenSansSemiBold, VolkhovLight } from '@/lib/typography';
import cn from '@/lib/util/cn';



interface Props {
    name: string
    url: string
}

export function Links({ name, url }: Props) {
    return (
        <Link className={`${styles.a} ${VolkhovLight.className}`} href={url}>{name}</Link>
    )
}
interface ButtonLinks {
    icon: IconType
    name: string
    url: string
}


export const ButtonLink = ({ icon: Icon, name, url }: ButtonLinks) => {


    return (
        <div className={cn(styles.buttonLink)}>
            <Icon size={23} />
            <Link className={OpenSansRegular.className} href={url} >{name}</Link>
        </div>
    )
}

interface LinkTitleProps {
    name: string
    url: string
}

export const LinkTitle = ({ name, url }: LinkTitleProps) => {
    return (
        <Link href={url} className={cn(OpenSansSemiBold.className, styles.titleLink)}>{name}</Link>
    )
}