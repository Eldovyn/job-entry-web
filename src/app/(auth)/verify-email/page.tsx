import IconEmail from "@/../public/iconEmailVerification.png"
import Image from "next/image"

const VerifyEmail = () => {
    return (
        <div className="bg-[#0b0d14] h-screen flex items-center justify-center w-full">
            <div className="bg-[#12141e] lg:w-[45%] md:w-[60%] sm:w-[70%] w-[90%] p-8 rounded-md mt-9 border-[#1f2236] border-2">
                <p className="text-white text-xl font-semibold text-center">Great, Now Check Your Email</p>
                <Image src={IconEmail} alt="icon email" className="w-[25%] mx-auto" />
                <p className="text-white text-sm mt-3">Check your inbox at rorzirifyo@gufum.com and click the verification link inside to complete your registration. This link will expire shortly, so verify soon!</p>
                <div className="flex md:flex-row lg:flex-row sm:flex-col flex-col text-sm mt-2">
                    <p className="text-white">Didn't receive the email?</p>
                    <p className="text-gray-400 md:ms-1 lg:ms-1">Check your spam folder.</p>
                </div>
                <div className="flex md:flex-row lg:flex-row sm:flex-col flex-col text-sm">
                    <p className="text-white">Link expired?</p>
                    <p className="text-blue-600 md:ms-1 lg:ms-1">Resend verification email.</p>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail