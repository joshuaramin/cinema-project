"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'
import CentralHeader from '../header'
import store from 'store2'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddJobPostSchema } from '@/lib/validation/JobPostSchema';
import { useMutation, useQuery } from '@apollo/client';
import { Create_Job_Post } from '@/lib/apollo/mutation/job_post.mutation';
import { GetAllJobPost, JobPostInterface } from '@/lib/apollo/query/job_post.query';
import { GetPosition } from '@/lib/apollo/query/position.query';
import Select from '@/components/select';
import { InputText } from '@/components/input';
import ReactEditor from '@/components/Lexical/editor';
import Pagination from '@/components/pagination';
import styles from '@/styles/lib/ui/central/job_post/job-post.module.scss';
import { isEmpty } from 'lodash';
import NoData from '@/components/nodata';
import JobPostCard from './job.card';
import Textarea from '@/components/textarea';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { OpenSansSemiBold, VolkhovLight } from '@/lib/typography';
import cn from '@/lib/util/cn';
import { Job_PostSubscriptions } from '@/lib/apollo/subscription/job_post.subscriptions';
import { GetAllShift } from '@/lib/apollo/query/shift.query';

type JobPostFields = {
    title: string
    description: string
    location: string
    status: string
    summary: string
    positionId: string
    jobType: string[]
    shiftId: string
}

export default function JobPage() {

    const user = store.get("UserAccount");
    const [search, setSearch] = useState<string>("");
    const [shiftSearch, setShiftSearch] = useState<string>("")
    const [jobPostSearch, setJobPostSearch] = useState<string>("")
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 20;

    const onHandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onHandleShiftSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onHandleJobPostSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setJobPostSearch(e.target.value);
    }

    const { data: GetJobPosition } = useQuery(GetPosition, {
        variables: {
            search: jobPostSearch
        }
    })


    const { data: ShiftData } = useQuery(GetAllShift,
        {
            variables: {
                input: {
                    take: 20,
                    page: 1
                },
                search: shiftSearch
            }
        }
    )

    const { data, subscribeToMore } = useQuery(GetAllJobPost, {
        variables: {
            input: {
                take: itemsPerPage,
                page: page
            },
            search
        }
    })

    const handleJobTypeClick = (jobType: string) => {
        const currentTypes = getValues("jobType");
        if (currentTypes.includes(jobType)) {
            setValue("jobType", currentTypes.filter((type) => type !== jobType));
        } else {
            setValue("jobType", [...currentTypes, jobType]);
        }
    };

    const { handleSubmit, register, formState: { errors }, watch, reset, setValue, getValues } = useForm<JobPostFields>({
        resolver: zodResolver(AddJobPostSchema),
        defaultValues: {
            jobType: [],
        }
    })

    const [mutate] = useMutation(Create_Job_Post)
    const oHandleSubmit: SubmitHandler<JobPostFields> = (data) => {
        mutate({
            variables: {
                positionId: `${data.positionId}`,
                input: {
                    title: data.title,
                    status: "Open",
                    summary: data.summary,
                    location: data.location,
                    jobType: data.jobType,
                    description: data.description,
                    shiftId: data.shiftId
                }
            },
            onCompleted: (data) => {
                if (data.create_job_post.job_post_id) {
                    toast.success("Successfully Created")
                }
                if (data.create_job_post.message) {
                    toast.error(data.create_job_post.message)
                }
            }
        })
    }

    useEffect(() => {
        return subscribeToMore({
            document: Job_PostSubscriptions,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const newJobPost = subscriptionData.data.JobPostSubscriptions

                return Object.assign({}, prev, {
                    getAllJobPost: {
                        ...prev.getAllJobPost,
                        item: [...prev.getAllJobPost.item, newJobPost]
                    }
                })
            }
        })
    }, [subscribeToMore])
    return (
        <div className={styles.container}>
            <CentralHeader
                title='Add New Job Post'
                submitForm={handleSubmit(oHandleSubmit)}
                onChange={onHandleSearch}
                body={
                    <>
                        <InputText
                            error={errors.title}
                            icon={false}
                            isRequired={true}
                            label='Title'
                            name={'title'}
                            register={register}
                            type='text'
                            placeholder=''
                        />
                        <Textarea
                            label='Summary'
                            name='summary'
                            isRequired={true}
                            register={register}
                            error={errors.summary}
                        />
                        <InputText
                            error={errors.location}
                            icon={false}
                            isRequired={true}
                            label='Location'
                            name={'location'}
                            register={register}
                            type='text'
                            placeholder=''
                        />
                        <Select
                            label='Job Shift'
                            name='shiftId'
                            isRequired={true}
                            error={errors.shiftId}
                            register={register}
                            onChange={onHandleShiftSearch}
                            setValue={setValue}
                            value={watch("shiftId")}
                            options={
                                (ShiftData?.getAllShift.item || []).map(({ shift_id, type }: { shift_id: string; type: string }) => ({
                                    label: type,
                                    value: shift_id,
                                }))
                            }
                        />
                        <div className={styles.jobType}>
                            <div className={styles.jobTypeHeader}>
                                <label className={VolkhovLight.className}>Job Type</label>
                                <span>*</span>
                            </div>
                            <div className={styles.jobSelection}>
                                {["Full-Time", "Part-Time", "Internship", "Urgent Hiring", "Contract"].map((helo, index) => (
                                    <button onClick={() => {
                                        handleJobTypeClick(helo)
                                    }} className={cn(OpenSansSemiBold.className,
                                        watch("jobType").includes(helo) ? styles.active : "")} key={index} value={helo}>{helo}</button>
                                ))}
                            </div>
                            <div className={styles.errorBody}>
                                {errors?.jobType && (
                                    <span className={styles.error}>{errors.jobType.message}</span>
                                )}
                            </div>
                        </div>
                        <Select
                            label='Job Position'
                            name='positionId'
                            isRequired={true}
                            error={errors.positionId}
                            register={register}
                            onChange={onHandleJobPostSearch}
                            setValue={setValue}
                            value={watch("positionId")}
                            options={
                                (GetJobPosition?.getPositions || []).map(({ position_id, position }: { position_id: string, position: string }) => {
                                    return {
                                        label: position,
                                        value: position_id
                                    }
                                })
                            }
                        />
                        <ReactEditor
                            label='Job Description'
                            name='description'
                            isRequired={true}
                            setValue={setValue}
                            error={errors.description}
                            height={400}
                        />
                    </>
                }

            />


            <div className={styles.body}>
                {isEmpty(data?.getAllJobPost.item) ? <NoData /> :
                    data?.getAllJobPost.item.map(({ job_post_id, title, eof, location, slug, status, jobType, description, draft, summary }: JobPostInterface, index: number) => (
                        <motion.div key={index}
                            initial={{ opacity: 0, y: 0.9 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.2, duration: 1
                            }}
                        >
                            <JobPostCard key={job_post_id} title={title} eof={eof} location={location} slug={slug} summary={summary}
                                job_post_id={job_post_id}
                                status={status}
                                jobType={jobType}
                                description={description}
                                draft={draft}
                            />
                        </motion.div>
                    ))}
            </div>

            <Pagination
                currentPage={page}
                hasNextPage={data?.getAllJobPost?.hasNextPage}
                hasPrevPage={data?.getAllJobPost?.hasPrevPage}
                totalItems={data?.getAllJobPost?.totalItems}
                totalPage={data?.getAllJobPost?.totalPages}
                pages={page}
                setPages={setPage}
            />
        </div>
    )
}
