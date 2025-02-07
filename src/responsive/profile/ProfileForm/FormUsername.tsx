import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { MdOutlineEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useFormik } from 'formik';
import { useToast } from "@/hooks/use-toast";
import LoadingSpinnerComponent from 'react-spinners-components';
import Cookies from "js-cookie";
import { User } from "@/interfaces/User";

interface FormData {
    username: string;
    confirm_username: string;
}

interface FormErrors {
    username: string[];
    confirm_username: string[];
    security_username: string[];
}

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

interface Props {
    isDialogOpen: boolean;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    userData: User | null;
    setUserData: Dispatch<SetStateAction<User | null>>;
}

const ProfileForm: React.FC<Props> = ({ isDialogOpen, setIsDialogOpen, userData, setUserData }) => {
    const { toast } = useToast()
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (userData) {
            setUsername(userData.username);
        }
    }, [userData]);

    const [formErrors, setFormErrors] = useState<FormErrors>({
        username: [],
        confirm_username: [],
        security_username: [],
    });

    const handleValidation = (errors: { username: string[]; confirm_username: string[], security_username: string[] }) => {
        setFormErrors({
            username: errors.username || [],
            confirm_username: errors.confirm_username || [],
            security_username: errors.security_username || [],
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosInstance.patch('/job-entry/update/username', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('accessToken') || ''}`
                },
            });
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            const data = err?.response?.data
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    username: data?.errors?.username || [],
                    confirm_username: data?.errors?.confirm_username || [],
                    security_username: data?.errors?.security_username || [],
                });
                toast({
                    description: err?.response?.data?.message,
                })
                return
            }
            toast({
                description: err?.response?.data?.message,
            })
            return
        },
        onSuccess: async (data) => {
            setUserData((prevUserData) => ({
                ...prevUserData,
                ...data.data.data
            }));
            setIsDialogOpen(false);
            toast({
                description: data.data.message,
            })
            const fields = ['username', 'confirmusername'];
            fields.forEach((field) => formik.setFieldValue(field, ''));
            handleValidation({
                username: [],
                confirm_username: [],
                security_username: [],
            });
        },
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            confirmusername: '',
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { username, confirmusername } = values
                mutate({
                    username,
                    confirm_username: confirmusername
                })
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    })

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <button className="relative w-full text-left">
                        <p className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2] text-white w-full p-1 rounded-md ps-3 truncate">
                            {username}
                        </p>
                        <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#4b5fe2]">
                            <MdOutlineEdit />
                        </span>
                    </button>
                </DialogTrigger>
                <DialogContent className="w-[90%] border-[#1b1d2e] bg-[#0b0d14] border-2 text-white rounded-md">
                    <DialogHeader>
                        <DialogTitle>Edit Username</DialogTitle>
                        <DialogDescription>
                            now you can edit your username
                        </DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-2" onSubmit={formik.isSubmitting ? () => {} : formik.handleSubmit}>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="username"
                            className="border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" value={formik.values.username} onChange={formik.handleChange}
                        />
                        {formErrors.username.map((error, index) => (
                            <p key={index} className="text-red-500 text-xs">
                                {error}
                            </p>
                        ))}
                        <Input
                            type="text"
                            id="confirmusername"
                            name="confirmusername"
                            placeholder="confirm username"
                            className="border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" value={formik.values.confirmusername} onChange={formik.handleChange}
                        />
                        {formErrors.confirm_username.map((error, index) => (
                            <p key={index} className="text-red-500 text-xs">
                                {error}
                            </p>
                        ))}
                        {formErrors.security_username.map((error, index) => (
                            <p key={index} className="text-red-500 text-xs">
                                {error}
                            </p>
                        ))}
                        <DialogFooter>
                            <Button type="submit" className="bg-[#4b5fe2] hover:bg-[#4558cf]">
                                {formik.isSubmitting ? (
                                    <div className="flex flex-row text-white items-center cursor-pointer">
                                        <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'100px'} />
                                        <p className="ms-1">Save Changes</p>
                                    </div>
                                ) : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProfileForm