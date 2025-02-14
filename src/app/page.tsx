"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useMe } from "@/api/user/me";
import Cookies from "js-cookie";
import SideBar from "@/components/sidebar";
import { useUserAllBatch } from "@/api/batch/useUserAllBatch";
import SearchBatch from "@/responsive/dashboard/batch/utils/SearchBatch";
import BatchPagination from "@/responsive/dashboard/batch/utils/BatchPagination";
import NavBar from "@/components/navbar";


const HomePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = searchParams.get("current_page")
    const q = searchParams.get("q");

    const [isClient, setIsClient] = useState(false);

    const { data: user, isLoading: userIsLoading, isError: userIsError, error: userError } = useMe(Cookies.get('accessToken') || '');
    const { data: batch, isLoading: batchIsLoading, isError: batchIsError, error: batchError } = useUserAllBatch(currentPage || "1", q || "", Cookies.get('accessToken') || '');

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isMobile = useMediaQuery({
        query: '(max-width: 425px)'
    });

    const isTablet = useMediaQuery({
        query: '(min-width: 425px) and (max-width: 1024px)'
    });

    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    });

    if (!isClient) {
        return null;
    }

    console.log(isMobile)

    if (isTablet || isDesktop) {
        return (
            <>
                <div className="flex bg-[#0b0d14]">
                    <SideBar category="user" user={user?.data || null} />
                    <main className={`flex-1 ml-20 sm:ml-40 lg:ml-72 p-8 bg-[#0b0d14] flex items-center justify-center`}>
                        <div className="h-screen bg-[#0b0d14] flex items-center justify-center md:w-[95%] lg:w-[90%] w-full">
                            <div className="bg-[#12141e] w-full border-2 p-8 rounded-md border-[#1f2236]">
                                <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
                                    Batch Pendaftaran
                                </p>
                                <div className="mt-3 flex justify-end flex-row">
                                    <SearchBatch category='user' />
                                </div>
                                {isTablet || isDesktop ? (
                                    <BatchPagination category="user" pagination={batch?.page || null} isDesktop={isDesktop} setPagination={null} />
                                ) : ''}
                            </div>
                        </div>
                    </main >
                </div >
            </>
        )
    }

    if (isMobile) {
        return (
            <>
                <NavBar category="user" />
                <div className="h-screen bg-[#0b0d14] flex items-center justify-center md:w-[95%] lg:w-[90%] w-full">
                    <div className="bg-[#12141e] w-[90%] border-2 p-8 rounded-md border-[#1f2236]">
                        <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
                            Batch Pendaftaran
                        </p>
                        <div className="mt-3 flex justify-end flex-row">
                            <SearchBatch category='user' />
                        </div>
                        <BatchPagination category="user" pagination={batch?.page || null} isDesktop={isDesktop} setPagination={null} />
                    </div>
                </div>
            </>
        )
    }
}

export default HomePage