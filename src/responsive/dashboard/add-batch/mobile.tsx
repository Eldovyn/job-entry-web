import NavBar from "@/components/navbar"
import AddBatch from "./form/AddBatch";
import React from "react";

interface Props {
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
}

const MobileAddBatch: React.FC<Props> = ({ isDesktop, isTablet, isMobile }) => {
    return (
        <>
            <NavBar category="admin" />
            <div className="h-screen bg-[#0b0d14] flex items-center justify-center md:w-[95%] lg:w-[90%] w-full">
                <div className="bg-[#12141e] w-[90%] border-2 p-8 rounded-md border-[#1f2236]">
                    <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
                        Batch Pendaftaran
                    </p>
                    <AddBatch isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} />
                </div>
            </div>
        </>
    )
}

export default MobileAddBatch