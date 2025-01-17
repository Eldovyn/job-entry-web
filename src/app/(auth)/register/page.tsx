import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const RegisterPage = () => {
    return (
        <>
            <div className="bg-[#0b0d14] h-screen flex items-center justify-center w-full text-white">
                <h1 className="bg-[#12141e] w-[50%] p-8 rounded-md mt-9 border-[#1f2236] border-2">
                    <p className="text-2xl font-bold">Create Your Account</p>
                    <form action="">
                        <div className="flex flex-col mb-3 mt-3">
                            <Input type="text" placeholder="username" className="border-[#1b1d2e] border-2" />
                        </div>
                        <div className="flex flex-col mb-3">
                            <Input type="text" placeholder="email" className="border-[#1b1d2e] border-2" />
                        </div>
                        <div className="flex flex-col mb-3">
                            <Input type="password" placeholder="password" className="border-[#1b1d2e] border-2" />
                        </div>
                        <Button className="bg-[#4b5fe2] hover:bg-[#4558cf] w-full">register</Button>
                        <div className="flex flex-row mt-3 text-sm">
                            <p className="text-[#b5b7da]">have an account?</p>
                            <p className="ms-1 text-blue-600">login</p>
                        </div>
                    </form>
                </h1>
            </div>
        </>
    )
}

export default RegisterPage