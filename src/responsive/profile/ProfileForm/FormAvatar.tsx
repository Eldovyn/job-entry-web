import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import ProfileAvatar from "@/../public/avatar.jpg";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";

interface FormData {
    avatar: File | null;
}

interface FormErrors {
    avatar: string[];
    security_avatar: string[];
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
    isDesktop: boolean | null;
    isTablet: boolean | null;
    isMobile: boolean | null;
    isSmallMobile: boolean | null;
}

const ProfileFormAvatar: React.FC<Props> = ({ isTablet, isDialogOpen, setIsDialogOpen, userData, setUserData, isSmallMobile, isMobile, isDesktop }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [avatar, setAvatar] = useState('');
    const { toast } = useToast();

    const [fileAvatar, setFileAvatar] = useState<File | null>(null);

    useEffect(() => {
        setAvatar(userData?.avatar || ProfileAvatar.src);
    }, [userData]);

    const [formErrors, setFormErrors] = useState<FormErrors>({
        avatar: [],
        security_avatar: [],
    });

    const handleValidation = (errors: { avatar: string[], security_avatar: string[] }) => {
        setFormErrors({
            avatar: errors.avatar || [],
            security_avatar: errors.security_avatar || [],
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (data: FormData) => {
            const formData = new FormData();
            if (data.avatar) {
                formData.append("avatar", data.avatar);
            }

            const response = await axiosInstance.patch('/job-entry/update/avatar', formData, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken') || ''}`,
                },
            });

            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            const data = err?.response?.data;
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    avatar: data?.errors?.avatar || [],
                    security_avatar: data?.errors?.security_avatar || [],
                });
                toast({
                    description: err?.response?.data?.message,
                });
                return;
            }
            toast({
                description: err?.response?.data?.message,
            });
            return;
        },
        onSuccess: async (data) => {
            setUserData((prevUserData) => ({
                ...prevUserData,
                ...data.data.data,
            }));
            setIsDialogOpen(false);
            toast({
                description: data.data.message,
            });
            const fields = ['avatar'];
            fields.forEach((field) => formik.setFieldValue(field, ''));
            handleValidation({
                avatar: [],
                security_avatar: [],
            });
            setFileAvatar(null);
        },
    });

    const formik = useFormik<FormData>({
        initialValues: {
            avatar: null,
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { avatar } = values;
                mutate({ avatar });
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
            setFileAvatar(file);
            formik.setFieldValue("avatar", file);
        }
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
            setFileAvatar(file);
            formik.setFieldValue("avatar", file);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className={`bg-[#4b5fe2] hover:bg-[#4558cf] mt-5 ${isTablet ? 'w-[8rem] text-[13px]' : 'text-sm w-[9rem]'} ${isMobile || isSmallMobile ? 'mx-auto w-[8rem]' : ''}`}>
                    Upload Avatar
                </Button>
            </DialogTrigger>
            <DialogContent className={`w-[90%] border-[#1b1d2e] bg-[#0b0d14] border-2 text-white rounded-md`}>
                <DialogHeader className={`${isDesktop || isTablet ? 'border-b-2 pb-3' : ''} border-[#1b1d2e]`}>
                    <DialogTitle>Edit Avatar</DialogTitle>
                    <DialogDescription>
                        Now you can edit your avatar
                    </DialogDescription>
                </DialogHeader>

                {userData ? (
                    <Image
                        src={avatar}
                        alt="Avatar"
                        width={100}
                        height={100}
                        className={`mx-auto ${isMobile || isSmallMobile && 'mt-3'} rounded-full w-[100px] h-[100px]`}
                    />
                ) : (
                    <p className="text-center text-gray-400">Loading avatar...</p>
                )}
                <div className="flex flex-col">
                    <div className="flex flex-row justify-center">
                        <div className={`border-[#1b1d2e] border-t-2 border-s-2 ${isMobile || isSmallMobile ? 'w-[9rem]' : 'w-[13rem]'} rounded-s-md border-b-2 focus:border-[#4b5fe2] h-9 text-[#71717a] flex items-center overflow-hidden whitespace-nowrap`}>
                            <p className="ms-3 text-ellipsis overflow-hidden">
                                {formik.values.avatar ? formik.values.avatar.name : "No file selected"}
                            </p>
                        </div>
                        <label
                            className={`border-[#1b1d2e] border-s-2 border-e-2 border-t-2 border-b-2 rounded-e-md w-[3rem] focus:border-[#4b5fe2] flex items-center justify-center cursor-pointer ${isDragging ? "bg-[#4b5fe2]" : ""}`}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragLeave={handleDragLeave}
                        >
                            <MdOutlineFileUpload className="text-white" size={25} />
                            <input
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex justify-center">
                        <Button onClick={() => formik.isSubmitting ? () => { } : formik.handleSubmit()} className="bg-[#4b5fe2] hover:bg-[#4558cf] mt-3 w-[12rem]">
                            Save Changes
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileFormAvatar;
