"use client"


import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from '@/styles/lib/ui/central/blog_post/blog-post.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddBlogPostSchema } from '@/lib/validation/BlogPostSchema'
import { useMutation, useQuery } from '@apollo/client'
import { GetCategories } from '@/lib/apollo/query/category.query'
import { Create_Blog_Post } from '@/lib/apollo/mutation/blog_post.mutation'
import store from 'store2'
import CentralHeader from '../header'
import toast from 'react-hot-toast'
import ReactEditor from '@/components/Lexical/editor'
import Select from '@/components/select'
import { BlogCardInterface, GetAllBlogPost } from '@/lib/apollo/query/blog_post.query';
import Pagination from '@/components/pagination';
import { isEmpty } from 'lodash';
import NoData from '@/components/nodata';
import { InputTag, InputText } from '@/components/input';
import BlogPostCard from './card';
import Textarea from '@/components/textarea';
import { motion } from 'motion/react';
import { BlogPostSubscriptions } from '@/lib/apollo/subscription/blog_post.subscriptions';


type BlogPostFields = {
    title: string
    excerpt: string
    description: string
    tags: string[]
    category: string
}

export default function BlogPostPage() {

    const user = store.get("UserAccount");
    const [search, setSearch] = useState<string>("");
    const [categorySearch, setCategorySearch] = useState<string>("")
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 20;


    const onHandleCategorySearch = (e: ChangeEvent<HTMLInputElement>) => {
        setCategorySearch(e.target.value);
    }
    const onHandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const { handleSubmit, formState: { errors }, register, setValue, watch, reset, } = useForm<BlogPostFields>({
        resolver: zodResolver(AddBlogPostSchema),
        defaultValues: {
            tags: []
        }
    })

    const { data: GetAllCategories } = useQuery(GetCategories, {
        variables: {
            search: categorySearch
        }
    })

    const { data, subscribeToMore } = useQuery(GetAllBlogPost, {
        variables: {
            input: {
                take: itemsPerPage,
                page: page
            },
            search
        }
    })

    const [mutate] = useMutation(Create_Blog_Post)

    const onHandleSubmit: SubmitHandler<BlogPostFields> = (data) => {

        mutate({
            variables: {
                input: {
                    title: data.title,
                    tags: data.tags,
                    image: "test",
                    excerpt: data.excerpt,
                    description: data.description
                },
                categoryId: data.category,
                userId: user?.user_id
            },
            onCompleted: () => {
                toast.success("Successfully Created")
                setValue("description", "")
                reset({
                    category: "",
                    description: "",
                    excerpt: "",
                    tags: [],
                    title: ""
                })
            }
        })

    }


    useEffect(() => {
        return subscribeToMore({
            document: BlogPostSubscriptions,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev

                const newBlogPost = subscriptionData.data.BlogPostSubscriptions

                return Object.assign({}, prev, {
                    getAllBlogPost: {
                        ...prev.getAllBlogPost,
                        item: [...prev.getAllBlogPost.item, newBlogPost]
                    }
                })
            }
        })
    }, [subscribeToMore])
    return (
        <div className={styles.container}>
            <CentralHeader
                title='Add New Blog Post'
                submitForm={handleSubmit(onHandleSubmit)}
                onChange={onHandleSearch}
                body={<>
                    <InputText
                        icon={false}
                        register={register}
                        isRequired={true}
                        label='Title'
                        name='title'
                        type='text'
                        error={errors.title}
                    />

                    <Textarea
                        error={errors.excerpt}
                        isRequired={true}
                        label='Excerpt'
                        name='excerpt'
                        register={register}
                    />

                    <InputTag
                        label='Tags'
                        name='tags'
                        isRequired={true}
                        register={register}
                        error={errors.tags}
                        setValue={setValue}
                        value={watch("tags")}
                    />
                    <Select
                        label='Category'
                        name='category'
                        isRequired={true}
                        error={errors.category}
                        register={register}
                        onChange={onHandleCategorySearch}
                        setValue={setValue}
                        value={watch("category")}
                        options={
                            (GetAllCategories?.getCategories || []).map(({ category_id, category }: { category_id: string; category: string }) => ({
                                label: category,
                                value: category_id,
                            }))
                        }
                    />

                    <ReactEditor
                        label='Description'
                        name='description'
                        isRequired={true}
                        setValue={setValue}
                        height={300}
                        error={errors.description}
                    />
                </>}
            />
            <div className={styles.body}>
                {isEmpty(data?.getAllBlogPost?.item) ? <NoData /> :
                    data?.getAllBlogPost?.item.map(({ blog_post_id, title, slug, excerpt, created_at }: BlogCardInterface, index: number) => (
                        <motion.div
                            key={blog_post_id}
                            initial={{ opacity: 0, y: 0.9 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.2, duration: 1
                            }}
                            className={styles.animate}
                        >
                            <BlogPostCard key={blog_post_id} title={title} slug={slug} excerpt={excerpt} created_at={created_at} blog_post_id={blog_post_id} />
                        </motion.div>
                    ))
                }
            </div>
            <Pagination
                currentPage={page}
                hasNextPage={data?.getAllBlogPost?.hasNextPage}
                hasPrevPage={data?.getAllBlogPost?.hasPrevPage}
                totalItems={data?.getAllBlogPost?.totalItems}
                totalPage={data?.getAllBlogPost?.totalPages}
                pages={page}
                setPages={setPage}
            />
        </div >
    )
}
