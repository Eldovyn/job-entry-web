'use client'
import { AuthForm } from "@/responsive/AuthForm"

const RegisterPage = () => {
    return (
        <>
            <div className="bg-[#0b0d14] h-screen flex items-center justify-center w-full text-white">
                <AuthForm catgory="register"/>
            </div>
        </>
    )
}

export default RegisterPage