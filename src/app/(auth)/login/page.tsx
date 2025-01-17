import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const LoginPage = () => {
    return (
        <>
            <div className="bg-[#0b0d14] h-screen flex items-center justify-center w-full text-white">
                <h1 className="bg-[#12141e] w-[50%] p-8 rounded-md mt-9 border-[#1f2236] border-2">
                    <p className="text-2xl font-bold">Login To Your Account</p>
                    <form action="">
                        <div className="flex flex-col mb-3 mt-3">
                            <Input type="email" placeholder="example@gmail.com" />
                        </div>
                        <div className="flex flex-col mb-2">
                            <Input type="password" placeholder="your password" />
                        </div>
                        <div className="flex flex-col mb-3">
                            <p className="flex justify-end text-[#b5b7da] text-sm">Don't have an account?</p>
                        </div>
                        <Button className="bg-[#4b5fe2] hover:bg-[#4558cf] w-full">Login</Button>
                        <div className="flex flex-row mt-3 text-sm">
                            <p className="text-[#b5b7da]">Dont have an account?</p>
                            <p className="ms-1 text-blue-600">Register</p>
                        </div>
                    </form>
                </h1>
            </div>
        </>
    )
}

export default LoginPage