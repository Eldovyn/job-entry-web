import React from "react";
import SideBar from "@/components/sidebar";
import Avatar from '../../../public/avatar.jpg';
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Profile = () => {
    return (
        <>
            <div className="flex">
                <SideBar />
                <main className="flex-1 ml-20 sm:ml-40 lg:ml-72 p-8 bg-[#0b0d14]">
                    <div className="bg-[#12141e] min-h-screen p-5 rounded-md border-[#1f2236] border-2 flex flex-col">
                        <p className="text-lg mb-3 text-white">Profile Picture</p>
                        <Image src={Avatar} alt="User Icon" width={100} height={100} className="rounded-full" />
                        <Button className="bg-[#4b5fe2] hover:bg-[#4558cf] w-[10rem] mt-5">Upload Avatar</Button>
                    </div>
                </main>
            </div>
        </>
    )
};

export default Profile;