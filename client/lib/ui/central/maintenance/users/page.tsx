"use client"
import React, {
    useState, ChangeEvent
} from 'react'
import MaintenanceHeader from '../header'
import { InputText } from '@/components/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UserSchema } from '@/lib/validation/UserSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Select from '@/components/select'
import { useMutation, useQuery } from '@apollo/client'
import { GetAllUserRoles } from '@/lib/apollo/query/role.query'
import { Create_User_Account } from '@/lib/apollo/mutation/user.mutation'
import toast from 'react-hot-toast'

type FormFields = {
    first_name: string
    last_name: string
    contact_no: string
    email: string
    password: string
    address_line_1: string
    address_line_2: string
    city: string
    country: string
    zipcode: string
    userRoleId: string
}

export default function UsersPage() {

    const [search, setSearch] = useState<string>("")
    const [role, setRoleSearch] = useState<string>("")


    const { data } = useQuery(GetAllUserRoles, {
        variables: {
            input: {
                take: 10,
                page: 1
            },
            search: role
        }
    })

    const onHandlSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const onHandleRoleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setRoleSearch(e.target.value)
    }

    const [mutate] = useMutation(Create_User_Account)

    const { register, formState: { errors }, handleSubmit, reset, setValue, watch } = useForm<FormFields>({
        resolver: zodResolver(UserSchema)
    })



    const onSubmit: SubmitHandler<FormFields> = (data) => {
        mutate({
            variables: {
                input: {
                    email: data.email,
                    password: data.password,
                    profile: {
                        contact_no: data.contact_no,
                        first_name: data.first_name,
                        last_name: data.last_name
                    }
                },
                address: {
                    address_line_1: data.address_line_1,
                    address_line_2: data.address_line_2,
                    city: data.city,
                    country: data.country,
                    zipcode: data.zipcode
                },
                userRoleId: data.userRoleId
            },
            onCompleted: (data) => {
                if (data.create_user_account.user_id) {
                    toast.success("Successfully Created")
                    reset({
                        address_line_2: "",
                        address_line_1: "",
                        city: "",
                        contact_no: "",
                        country: "",
                        email: "",
                        first_name: "",
                        last_name: "",
                        password: "",
                        userRoleId: "",
                        zipcode: ""
                    })
                }

                if (data.create_user_account.message) {
                    toast.success(data.create_user_account.message)
                }
            },
            onError: (data) => {
                console.log(data)
            },
            errorPolicy: "all",
            context: {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY
                }
            }
        })
    }

    return (
        <div>
            <MaintenanceHeader
                title='Add New User'
                onChange={onHandlSearch}
                body={
                    <>

                        <InputText
                            icon={false}
                            isRequired={true}
                            label='First Name'
                            name='first_name'
                            placeholder='first nane'
                            type='text'
                            error={errors.first_name}
                            register={register}
                        />
                        <InputText
                            icon={false}
                            isRequired={true}
                            label='Last Name'
                            name='last_name'
                            placeholder='last nane'
                            type='text'
                            error={errors.last_name}
                            register={register}
                        />
                        <InputText
                            icon={false}
                            isRequired={true}
                            label='Email'
                            name='email'
                            placeholder='Email Address'
                            type='text'
                            error={errors.email}
                            register={register}
                        />

                        <InputText
                            icon={false}
                            isRequired={true}
                            label='Password'
                            name='password'
                            placeholder=''
                            type='text'
                            error={errors.password}
                            register={register}
                        />
                        <InputText
                            icon={false}
                            isRequired={true}
                            label='Contact No.'
                            name='contact_no'
                            placeholder=''
                            type='text'
                            error={errors.contact_no}
                            register={register}
                        />
                        <hr />

                        <InputText
                            icon={false}
                            isRequired={true}
                            label='Address Line 1'
                            name='address_line_1'
                            placeholder=''
                            type='text'
                            error={errors.address_line_1}
                            register={register}
                        />

                        <InputText
                            icon={false}
                            isRequired={true}
                            label='Address Line 2'
                            name='address_line_2'
                            placeholder=''
                            type='text'
                            error={errors.address_line_2}
                            register={register}
                        />

                        <InputText
                            icon={false}
                            isRequired={true}
                            label='City'
                            name='city'
                            placeholder=''
                            type='text'
                            error={errors.city}
                            register={register}
                        />

                        <InputText
                            icon={false}
                            isRequired={true}
                            label='Country'
                            name='country'
                            placeholder=''
                            type='text'
                            error={errors.country}
                            register={register}
                        />
                        <InputText
                            icon={false}
                            isRequired={true}
                            label='Zipcode'
                            name='zipcode'
                            placeholder=''
                            type='text'
                            error={errors.zipcode}
                            register={register}
                        />
                        {watch("userRoleId")}
                        <Select
                            label='User Role'
                            name='userRoleId'
                            isRequired={true}
                            register={register}
                            value={watch("userRoleId")}
                            setValue={setValue}
                            onChange={onHandleRoleSearch}
                            error={errors.userRoleId}
                            options={
                                (data?.getAllUserRole.item || []).map(({ user_role_id, name }: { user_role_id: string, name: string }) => {
                                    return {
                                        label: name,
                                        value: user_role_id
                                    }
                                })
                            }

                        />
                    </>
                }
                submitForm={handleSubmit(onSubmit)}
            />
        </div>
    )
}
