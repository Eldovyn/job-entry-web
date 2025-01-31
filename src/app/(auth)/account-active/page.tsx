'use client'
import IconVerification from "@/../public/Verification.png"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

const AccountActive = () => {
    const { push } = useRouter();
    const searchParams = useSearchParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['email-account-active'],
        queryFn: async () => {
            const token = searchParams.get('token');
            const response = await axiosInstance.get(`/job-entry/account-active/email-verification`, {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    token
                },
            });
            return response;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    const err = error as AxiosError<ErrorResponse>;

    if (err) {
        push(`/register`);
    }

    useEffect(() => {
        if (data) {
            const timer = setTimeout(() => {
                push("/login");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [data, push]);

    return (
        <div className="bg-[#0b0d14] h-screen flex items-center justify-center w-full">
            <div className="bg-[#12141e] lg:w-[45%] md:w-[60%] sm:w-[70%] w-[90%] p-8 rounded-md mt-9 border-[#1f2236] border-2">
                <Image src={IconVerification} alt="icon email" className="w-[25%] mx-auto" />
                <p className="text-white mt-2">
                    {`Thanks ${data?.data?.email} for creating your account. Your account is now active.`}
                </p>
                <p className="text-gray-400 text-sm mt-1">Redirecting to login in 5 seconds...</p>
                <Link href="/login">
                    <p className="text-blue-500 mt-3 cursor-pointer">Login</p>
                </Link>
            </div>
        </div>
    );
};

export default AccountActive;
