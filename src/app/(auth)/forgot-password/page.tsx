'use client'
import { AuthForm } from "@/layout/AuthForm"

const ResetPasswordPage = () => {
    return (
        <>
            <div className="bg-[#0b0d14] h-screen flex items-center justify-center w-full text-white">
                <AuthForm catgory="reset-password"/>
            </div>
        </>
    )
}

export default ResetPasswordPage