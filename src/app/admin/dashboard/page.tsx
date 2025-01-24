'use client';
import React from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoExitOutline } from "react-icons/io5";
import { useMediaQuery } from 'react-responsive'

const Dashboard = () => {
    const isMobile = useMediaQuery({
        query: '(max-width: 640px)'
    })

    const isUltraMobile = useMediaQuery({
        query: '(max-width: 320px)'
    })

    return (
        <>
            <div className="h-screen bg-[#0b0d14] flex items-center justify-center">
                <div className="bg-[#12141e] w-[75%] border-2 p-8 rounded-md border-[#1f2236]">
                    <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
                        Data Mahasiswa
                    </p>
                    <div className="mt-3 flex justify-end flex-row">
                        <div className="relative lg:w-[30%] w-full flex">
                            <Input
                                className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2] pr-10"
                                placeholder="cari sesuai nama/npm"
                                type="text"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <FaSearch />
                            </span>
                        </div>
                        {!isMobile ? (
                            <>
                                <Button className="bg-[#4b5fe2] hover:bg-[#4558cf] ms-3 lg:w-[10%] md:w-[20%] w-[30%] h-[2.05rem]">
                                    <div className="flex flex-row">
                                        <IoExitOutline className="text-white pt-1 pe-1" />
                                        <p className="text-white">Logout</p>
                                    </div>
                                </Button>
                            </>) : ''}
                    </div>
                    {isMobile || isUltraMobile ? (
                        <>
                            <Button className={`bg-[#4b5fe2] hover:bg-[#4558cf] mt-3 lg:w-[10%] md:w-[20%] ${isMobile ? 'w-[30%]' : ''} ${isUltraMobile ? 'w-[70%]' : ''} h-[2.05rem]`}>
                                <div className="flex flex-row">
                                    <IoExitOutline className="text-white pt-1 pe-1" />
                                    <p className="text-white">Logout</p>
                                </div>
                            </Button>
                        </>) : ''}
                </div>
            </div>
        </>
    )
};

export default Dashboard;