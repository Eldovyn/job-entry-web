import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import LoadingSpinnerComponent from "react-spinners-components";
import { useRouter } from "next/navigation";

interface Props {
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
}

interface FormData {
    title: string;
    description: string;
}

interface FormErrors {
    title: string[];
    description: string[];
}

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

const AddBatch: React.FC<Props> = ({ isDesktop, isTablet, isMobile }) => {
    if (!isDesktop && !isTablet && !isMobile) return null;

    const { toast } = useToast();
    const { push } = useRouter();

    const [formErrors, setFormErrors] = useState<FormErrors>({
        title: [],
        description: [],
    });

    const handleValidation = (errors: { title: string[]; description: string[] }) => {
        setFormErrors({
            title: errors.title || [],
            description: errors.description || [],
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosInstance.post('/job-entry/admin/batch', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('accessToken') || ''}`
                },
            });
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    title: err.response?.data?.errors?.title ?? [],
                    description: err.response?.data?.errors?.description ?? [],
                });
            }
            toast({
                description: err?.response?.data?.message,
            })
            return
        },
        onSuccess: async (data) => {
            const dataApi = data.data
            console.log(dataApi);
            toast({
                description: dataApi.message,
            })
            handleValidation({
                title: [],
                description: [],
            })
            formik.setFieldValue('title', '');
            formik.setFieldValue('description', '');
            push(`/admin/dashboard/batch?current_page=${dataApi.page.current_page}&q=${dataApi.data.batch_id}`);
        },
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { title, description } = values
                mutate({
                    title,
                    description
                })
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    })

    return (
        <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit} className="mt-3">
            {['title', 'description'].map((label, index) => (
                <div key={index} className="flex flex-col gap-2 pt-2">
                    <label className="text-sm font-semibold text-white">
                        {label}
                    </label>
                    <Input
                        type="text"
                        placeholder={label}
                        name={label}
                        onChange={formik.handleChange} value={formik.values[label as keyof FormData]}
                        className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
                    />
                    {formErrors[label as keyof FormErrors].length > 0 && (
                        <p className="text-sm text-red-500">{formErrors[label as keyof FormErrors][0]}</p>
                    )}
                </div>
            ))}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="mt-3 bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[7rem]"
                >
                    {formik.isSubmitting ? (
                        <div className="flex flex-row text-white items-center cursor-pointer">
                            <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'100px'} />
                            <p className="ms-1">Add Batch</p>
                        </div>
                    ) : "Add Batch"}
                </Button>
            </div>
        </form>
    );
};

export default AddBatch;