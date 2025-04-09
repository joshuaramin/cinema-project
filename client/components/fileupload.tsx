import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import styles from '@/styles/components/fileupload.module.scss';
import { OpenSansRegular, VolkhovLight } from '@/lib/typography';
import cn from '@/lib/util/cn';
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
import { TbFileUpload, TbDragDrop, TbDragDrop2, TbX } from 'react-icons/tb';


type AcceptedFile = {
    [key: string]: string[]
}

interface FileUploadProps<T extends FieldValues = any> {
    name: string
    label: string
    isRequired: boolean
    error: FieldError | undefined
    accepted: AcceptedFile
    register: UseFormRegister<T>
    setValue: any
    value: any
}


export function FileUpload({ name, label, isRequired, error, accepted, register, setValue, value }: FileUploadProps) {

    const [fUpload, setFUpload] = useState({
        name: "",
    })
    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        console.log(acceptedFiles[0])
        setValue(name, acceptedFiles[0])
        setFUpload({
            name: acceptedFiles[0].name
        })

    }, [setValue, setFUpload])



    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: accepted,
        onError: () => {
            toast.error("Invalid File Format")
        },
        useFsAccessApi: false
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <label className={cn(styles.label, VolkhovLight.className)}>{label}</label>
                {isRequired ? <span className={styles.isRequired}>*</span> : null}
            </div>
            <div className={styles.body} {...getRootProps()}>
                <input
                    {...register(name)}
                    {...getInputProps()}
                />
                <div className={styles.dragndrop}>
                    <TbDragDrop size={60} />
                    <span className={OpenSansRegular.className}>Click to Upload or drag 'n' drop</span>
                </div>

            </div>
            {fUpload.name && <div className={styles.fileCard}>
                <div>
                    <TbFileUpload size={40} />
                    <span className={VolkhovLight.className}>{fUpload.name}</span>
                </div>
                <div>
                    <button onClick={() => setFUpload({ name: "" })}>
                        <TbX size={23} />
                    </button>
                </div>
            </div>}
            <div className={styles.errorBody}>
                <span className={styles.error}>{error?.message}</span>
            </div>
        </div>
    )
}
