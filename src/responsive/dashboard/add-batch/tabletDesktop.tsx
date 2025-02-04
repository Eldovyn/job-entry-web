import SideBar from "@/components/sidebar"
import AddBatch from "./form/AddBatch";
import React from "react";

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
    user: User;
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
}

const TabletDesktopAddBatch: React.FC<Props> = ({ user, isDesktop, isTablet, isMobile }) => {
    return (
        <>
            <div className="flex bg-[#0b0d14]">
                <SideBar category="admin" user={user} />
                <main className={`flex-1 ml-20 sm:ml-40 lg:ml-72 p-8 h-screen bg-[#0b0d14] flex items-center justify-center`}>
                    <div className="h-screen bg-[#0b0d14] flex items-center justify-center md:w-[95%] lg:w-[90%] w-full">
                        <div className="bg-[#12141e] md:w-[75%] lg:w-[60%] w-[85%] border-2 p-8 rounded-md border-[#1f2236]">
                            <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
                                Batch Pendaftaran
                            </p>
                            <AddBatch isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} />
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default TabletDesktopAddBatch