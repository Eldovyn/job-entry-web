import { Button } from "@/components/ui/button";
import SwitchAuthLink from "@/components/SwitchLink";
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
    email: string;
}

interface FormErrors {
    email: string[];
}

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

const ForgotPassword = () => {
    const { push } = useRouter();
    const { toast } = useToast()

    const [formErrors, setFormErrors] = useState<FormErrors>({
        email: [],
    });

    const handleValidation = (errors: { email: string[] }) => {
        setFormErrors({
            email: errors.email || [],
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosInstance.post('/job-entry/reset-password', data);
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    email: err.response?.data?.errors?.email ?? [],
                });
            }
            toast({
                description: err?.response?.data?.message,
            })
            return
        },
        onSuccess: async (data) => {
            const dataApi = data.data
            toast({
                description: dataApi.message,
            })
            handleValidation({
                email: [],
            })
            formik.setFieldValue('email', '');
            setTimeout(() => push(`/forgot-password/sent?token=${dataApi.reset_password.token}`), 5000);
        },
    })

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { email } = values
                mutate({
                    email,
                })
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    })

    return (
        <div className="bg-[#12141e] lg:w-[45%] md:w-[45%] w-[90%] p-8 rounded-md mt-9 border-[#1f2236] border-2">
            <p className="text-2xl font-bold mb-3 text-white text-center">Reset Password</p>
            <form action="" onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                <div className="flex flex-col mb-3">
                    <Input
                        type='text'
                        placeholder='email' name="email"
                        className="caret-white mb-1 border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" onChange={formik.handleChange} value={formik.values.email}
                    />
                    {formErrors.email.map((error, index) => (
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
                <SwitchAuthLink switchText="Dont have an account?" switchLink="/register" Category="login" />
            </form>
        </div>
    );
}

export default ForgotPassword