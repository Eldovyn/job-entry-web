import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useFormik } from 'formik';
import LoadingSpinnerComponent from 'react-spinners-components';
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
    password: string;
    confirm_password: string;
}

interface FormErrors {
    password: string[];
    confirmPassword: string[];
    passwordSecurity: string[];
}

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
    data?: {
        [field: string]: string[];
    };
    account_active?: {
        [field: string]: string[];
    };
}

const ResetPassword = () => {
    const { push } = useRouter();
    const { toast } = useToast()
    const searchParams = useSearchParams();

    const [formErrors, setFormErrors] = useState<FormErrors>({
        password: [],
        confirmPassword: [],
        passwordSecurity: [],
    });

    const handleValidation = (errors: { password: string[]; confirmPassword: string[], passwordSecurity: string[] }) => {
        setFormErrors({
            password: errors.password || [],
            confirmPassword: errors.confirmPassword || [],
            passwordSecurity: errors.passwordSecurity || [],
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosInstance.patch('/job-entry/user/reset-password', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    token: searchParams.get('token'),
                },
            });
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    password: err.response?.data?.errors?.password ?? [],
                    confirmPassword: err.response?.data?.errors?.confirm_password ?? [],
                    passwordSecurity: err.response?.data?.errors?.security_password ?? [],
                });
            }
            toast({
                description: err?.response?.data?.message,
            })
            return
        },
        onSuccess: async (data) => {
            toast({
                description: "success update password",
            })
            push(`/login`)
        },
    })

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { password, confirmPassword } = values
                mutate({
                    password,
                    confirm_password: confirmPassword
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
            <div className="bg-[#12141e] lg:w-[45%] md:w-[45%] w-[90%] p-8 rounded-md mt-9 border-[#1f2236] border-2">
                <p className="text-2xl font-bold mb-3 text-white text-center">Reset Password</p>
                <form action="" onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                    <div className="flex flex-col mb-3">
                        <Input
                            type='password'
                            placeholder='password' name="password"
                            className="caret-white mb-1 border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" onChange={formik.handleChange} value={formik.values.password}
                        />
                        {formErrors.password.map((error, index) => (
                            <p key={index} className="text-red-500 text-sm">{error}</p>
                        ))}
                    </div>
                    <div className="flex flex-col mb-1">
                        <Input
                            type='password'
                            placeholder='confirm password' name="confirmPassword"
                            className="caret-white mb-1 border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" onChange={formik.handleChange} value={formik.values.confirmPassword}
                        />
                        {formErrors.confirmPassword.map((error, index) => (
                            <p key={index} className="text-red-500 text-sm">{error}</p>
                        ))}
                    </div>
                    <div className="flex flex-row mb-1">
                    {formErrors.passwordSecurity.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">{error}</p>
                    ))}
                    </div>
                    <Button className="bg-[#4b5fe2] hover:bg-[#4558cf] w-full" type="submit">
                        {formik.isSubmitting ? (
                            <div className="flex flex-row text-white items-center cursor-pointer">
                                <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'100px'} />
                                <p className="ms-1">Reset Password</p>
                            </div>
                        ) : "Reset Password"}
                    </Button>
                </form>
            </div>
        </>
    )
}

export default ResetPassword