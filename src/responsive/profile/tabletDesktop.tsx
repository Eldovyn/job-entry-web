import SideBar from "@/components/sidebar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster"
import React, { useState, Dispatch, SetStateAction } from "react";
import AvatarProfile from '@/../public/avatar.jpg';
import ProfileFormAvatar from "./ProfileForm/FormAvatar";
import ProfileFormEmail from "./ProfileForm/FormEmail";
import ProfileFormUsername from "./ProfileForm/FormUsername";
import { User } from "@/interfaces/User";

interface Props {
    user: User | null;
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
    isSmallMobile: boolean;
    setUserData: Dispatch<SetStateAction<User | null>>;
    category: string
}

const TabletDesktopProfile: React.FC<Props> = ({ user, category, setUserData, isTablet, isDesktop, isMobile, isSmallMobile }) => {
    const [isDialogOpenUsername, setIsDialogOpenUsername] = useState(false);
    const [isDialogOpenEmail, setIsDialogOpenEmail] = useState(false);
    const [isDialogOpenAvatar, setIsDialogOpenAvatar] = useState(false);

    return (
        <>
            <div className="flex bg-[#0b0d14]">
                <SideBar category={category} user={user} />
                <main className="flex-1 overflow-auto ml-20 sm:ml-40 lg:ml-72 p-8 min-h-screen bg-[#0b0d14] flex items-center justify-center">
                    <div className="bg-[#12141e] md:w-[75%] lg:w-[60%] w-[85%] mx-auto p-5 rounded-md border-[#1f2236] border-2 flex flex-col">
                        <p className="text-lg mb-3 text-white font-semibold">Profile Picture</p>
                        <Image
                            src={user?.avatar || AvatarProfile.src}
                            className="rounded-full object-cover w-[100px] h-[100px]"
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
            </div>
        </>
    )
}

export default TabletDesktopProfile