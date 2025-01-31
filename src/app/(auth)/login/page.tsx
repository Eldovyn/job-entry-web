'use client'
import { AuthForm } from "@/layout/AuthForm"

const LoginPage = () => {
    return (
        <>
            <div className="bg-[#0b0d14] h-screen flex items-center justify-center w-full text-white">
                <AuthForm catgory="login"/>
            </div>
        </>
    )
}

export default LoginPage