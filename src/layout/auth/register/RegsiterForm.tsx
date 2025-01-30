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

interface FormData {
    username: string;
    email: string;
    password: string;
}

interface FormErrors {
    username: string[];
    email: string[];
    password: string[];
}

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

const RegisterForm: React.FC = () => {
    const { push } = useRouter();

    const [formErrors, setFormErrors] = useState<FormErrors>({
        username: [],
        email: [],
        password: [],
    });

    const handleValidation = (errors: { username: string[]; email: string[]; password: string[] }) => {
        setFormErrors({
            username: errors.username || [],
            email: errors.email || [],
            password: errors.password || [],
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosInstance.post('/job-entry/register', data);
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    username: err.response?.data?.errors?.username ?? [],
                    email: err.response?.data?.errors?.email ?? [],
                    password: err.response?.data?.errors?.password ?? [],
                });
            }
        },
        onSuccess: async (data) => {
            const fields = ['username', 'email', 'password'];
            fields.forEach(field => formik.setFieldValue(field, ''));
            handleValidation({
                username: [],
                email: [],
                password: [],
            })
        },
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { username, email, password } = values
                mutate({
                    username,
                    email,
                    password
                })
                console.log('Form submitted:', values);
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    })

    return (
        <div className="bg-[#12141e] w-[45%] p-8 rounded-md mt-9 border-[#1f2236] border-2">
            <p className="text-2xl font-bold mb-3 text-white text-center">Register</p>
            <form action="" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col mb-3">
                    <Input
                        type='text'
                        placeholder='username' name="username"
                        className="caret-white mb-1 border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" onChange={formik.handleChange} value={formik.values.username}
                    />
                    {formErrors.username.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">{error}</p>
                    ))}
                </div>
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
                <Button className="bg-[#4b5fe2] hover:bg-[#4558cf] w-full" type="submit">
                    {formik.isSubmitting ? (
                        <div className="flex flex-row text-white items-center cursor-pointer">
                            <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'100px'} />
                            <p className="ms-1">Register</p>
                        </div>
                    ) : "Register"}
                </Button>
                <SwitchAuthLink switchText="Already have an account?" switchLink="/login" Category="register" />
            </form>
        </div>
    );
};

export default RegisterForm;
