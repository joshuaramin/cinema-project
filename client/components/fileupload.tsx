import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import styles from '@/styles/components/fileupload.module.scss';
import { OpenSansRegular, VolkhovLight } from '@/lib/typography';
import cn from '@/lib/util/cn';
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';


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

    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        setValue(name, acceptedFiles[0])
    }, [])



    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: accepted,
        onError: () => {
            toast.error("Invalid File Format")
        }
    });

    console.log(value)

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <label className={cn(styles.label, VolkhovLight.className)}>{label}</label>
                {isRequired ? <span className={styles.isRequired}>*</span> : null}
            </div>
            <div className={styles.body} {...getRootProps()}>
                <input
                    {...register(name, { required: "File Upload(s) is required" })}
                    {...getInputProps()}
                    defaultValue={value}
                />
                {
                    value ?
                        <p>Drop the files here...</p> :
                        <p className={OpenSansRegular.className}>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            <div className={styles.errorBody}>
                <span className={styles.error}>{error?.message}</span>
            </div>
        </div>
    )
}
