import React from "react";
import SideBar from "@/components/sidebar";
import Avatar from '../../../public/avatar.jpg';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Profile = () => {
    return (
        <>
            <div className="flex">
                <SideBar />
                <main className="flex-1 ml-20 sm:ml-40 lg:ml-72 p-8 h-screen bg-[#0b0d14] flex items-center justify-center">
                    <div className="bg-[#12141e] md:w-[80%] w-[90%] lg:w-[60%] mx-auto p-5 rounded-md border-[#1f2236] border-2 flex flex-col">
                        <p className="text-lg mb-3 text-white">Profile Picture</p>
                        <Image src={Avatar} alt="User Icon" width={100} height={100} className="rounded-full" />
                        <Button className="bg-[#4b5fe2] hover:bg-[#4558cf] w-[9rem] mt-5 text-sm">Upload Avatar</Button>
                        <form action="" className="mt-5">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="email" className="text-white mb-1 text-sm">Email</label>
                                <Input
                                    placeholder='email'
                                    className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
                                    name="email"
                                    type="email"
                                />
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="username" className="text-white mb-1 text-sm">Username</label>
                                <Input
                                    placeholder='username'
                                    className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
                                    name="username"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="password" className="text-white mb-1 text-sm">Password</label>
                                <Input
                                    placeholder='password'
                                    className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
                                    name="password"
                                    type="password"
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button className="bg-[#4b5fe2] hover:bg-[#4558cf] w-[9rem] text-sm">Save Changes</Button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    )
};

export default Profile;