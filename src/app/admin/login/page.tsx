import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminLogin = () => {
    return (
        <>
            <div className="bg-[#0b0d14] h-screen flex items-center justify-center w-full">
                <div className="bg-[#12141e] w-[25%] border-2 p-8 rounded-md mt-9 border-[#1f2236]">
                    <p className="text-white text-2xl font-semibold">Login Stuf</p>
                    <form action="" className="mt-3">
                        <div className="flex flex-col">
                            <Input className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" placeholder="email" type="text" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <Input className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" placeholder="password" type="password" />
                        </div>
                        <div className="flex flex-col">
                            <Button className="bg-[#4b5fe2] hover:bg-[#4558cf] w-full mt-3">Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminLogin