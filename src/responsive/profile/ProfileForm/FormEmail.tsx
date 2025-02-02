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

interface FormData {
    email: string;
    confirm_email: string;
}

interface FormErrors {
    email: string[];
    confirm_email: string[];
    security_email: string[];
}

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

interface User {
    avatar: string;
    created_at: number;
    email: string;
    is_active: boolean;
    is_admin: boolean;
    updated_at: number;
    user_id: string;
    username: string;
}

interface Props {
    isDialogOpen: boolean;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    userData: User | null;
    setUserData: Dispatch<SetStateAction<User | null>>;
}

const TabletDesktopProfileFormEmail: React.FC<Props> = ({ isDialogOpen, setIsDialogOpen, userData, setUserData }) => {
    const { toast } = useToast()
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (userData) {
            setEmail(userData.email);
        }
    }, [userData]);

    const [formErrors, setFormErrors] = useState<FormErrors>({
        email: [],
        confirm_email: [],
        security_email: [],
    });

    const handleValidation = (errors: { email: string[]; confirm_email: string[], security_email: string[] }) => {
        setFormErrors({
            email: errors.email || [],
            confirm_email: errors.confirm_email || [],
            security_email: errors.security_email || [],
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosInstance.patch('/job-entry/update/email', data, {
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
                    email: data?.errors?.email || [],
                    confirm_email: data?.errors?.confirm_email || [],
                    security_email: data?.errors?.security_email || [],
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
            const fields = ['email', 'confirmEmail'];
            fields.forEach((field) => formik.setFieldValue(field, ''));
            handleValidation({
                email: [],
                confirm_email: [],
                security_email: [],
            });
        },
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            confirmEmail: '',
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { email, confirmEmail } = values
                mutate({
                    email,
                    confirm_email: confirmEmail
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
                        <p className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2] text-white w-full p-1 rounded-md ps-3">
                            {email}
                        </p>
                        <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#4b5fe2]">
                            <MdOutlineEdit />
                        </span>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] border-[#1b1d2e] bg-[#0b0d14] border-2 text-white">
                    <DialogHeader>
                        <DialogTitle>Edit Email</DialogTitle>
                        <DialogDescription>
                            now you can edit your email
                        </DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-2" onSubmit={formik.isSubmitting ? () => {} : formik.handleSubmit}>
                        <Input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="email"
                            className="border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" value={formik.values.email} onChange={formik.handleChange}
                        />
                        {formErrors.email.map((error, index) => (
                            <p key={index} className="text-red-500 text-xs">
                                {error}
                            </p>
                        ))}
                        <Input
                            type="text"
                            id="confirmEmail"
                            name="confirmEmail"
                            placeholder="confirm email"
                            className="border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" value={formik.values.confirmEmail} onChange={formik.handleChange}
                        />
                        {formErrors.confirm_email.map((error, index) => (
                            <p key={index} className="text-red-500 text-xs">
                                {error}
                            </p>
                        ))}
                        {formErrors.security_email.map((error, index) => (
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

export default TabletDesktopProfileFormEmail