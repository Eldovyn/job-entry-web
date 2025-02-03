import React from "react";
import NavBar from "@/components/navbar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster"
import AvatarProfile from '@/../public/avatar.jpg';
import { useState, Dispatch, SetStateAction } from "react";
import ProfileFormAvatar from "./ProfileForm/FormAvatar";
import ProfileFormEmail from "./ProfileForm/FormEmail";
import ProfileFormUsername from "./ProfileForm/FormUsername";

interface User {
    avatar: string;
    created_at: number;
    email: string;
    is_active: boolean;
    is_admin: boolean;
    updated_at: number;
    user_id: string;
    username: string;
}

interface Props {
    setUserData: Dispatch<SetStateAction<User | null>>;
    user: User | null
    isDesktop: boolean
    isTablet: boolean
    isSmallMobile: boolean
    isMobile: boolean
}

const MobileProfile: React.FC<Props> = ({ isDesktop, isTablet, isMobile, isSmallMobile, user, setUserData }) => {
    const [isDialogOpenUsername, setIsDialogOpenUsername] = useState(false);
    const [isDialogOpenEmail, setIsDialogOpenEmail] = useState(false);
    const [isDialogOpenAvatar, setIsDialogOpenAvatar] = useState(false);

    return (
        <>
            <NavBar category="user" />
            <main className="p-8 h-screen bg-[#0b0d14] flex items-center justify-center">
                <div className="bg-[#12141e] md:w-[75%] lg:w-[60%] w-[85%] mx-auto p-5 rounded-md border-[#1f2236] border-2 flex flex-col">
                    <p className="text-lg mb-3 text-white text-center font-semibold">Profile Picture</p>
                    <Image
                        src={user?.avatar || AvatarProfile.src}
                        className="rounded-full object-cover w-[100px] h-[100px] mx-auto"
                        alt="User Icon"
                        width={100}
                        height={100}
                        priority
                    />
                    <ProfileFormAvatar userData={user} setUserData={setUserData} isDialogOpen={isDialogOpenAvatar} setIsDialogOpen={setIsDialogOpenAvatar} isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} isSmallMobile={isSmallMobile} />
                    <div className="flex flex-col mb-3 mt-3">
                        <label htmlFor="email" className="text-white mb-1 text-sm">Email</label>
                        <ProfileFormEmail userData={user} setUserData={setUserData} isDialogOpen={isDialogOpenEmail} setIsDialogOpen={setIsDialogOpenEmail} />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="username" className="text-white mb-1 text-sm">Username</label>
                        <ProfileFormUsername userData={user} setUserData={setUserData} isDialogOpen={isDialogOpenUsername} setIsDialogOpen={setIsDialogOpenUsername} />
                    </div>
                </div>
                <Toaster />
            </main>
        </>
    )
};

export default MobileProfile