import SideBar from "@/components/sidebar"
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Switch } from "@/components/ui/switch"


interface DataBatch {
    title: string;
    duration: string;
    idBatch: string;
}

const BatchPage = () => {
    const dataBatch: DataBatch[] = [
        {
            title: "form pendaftaran batch 2023",
            duration: "7d ago",
            idBatch: "1"
        },
        {
            title: "form pendaftaran batch 2024",
            duration: "7d ago",
            idBatch: "2"
        },
        {
            title: "form pendaftaran batch 2025",
            duration: "7d ago",
            idBatch: "3"
        },
    ];

    return (
        <>
            <div className="flex bg-[#0b0d14]">
                <SideBar category="admin" />
                <main className={`flex-1 ml-20 sm:ml-40 lg:ml-72 p-8 h-screen bg-[#0b0d14] flex items-center justify-center`}>
                    <div className="h-screen bg-[#0b0d14] flex items-center justify-center md:w-[95%] lg:w-[90%] w-full">
                        <div className="bg-[#12141e] w-full border-2 p-8 rounded-md border-[#1f2236]">
                            <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
                                Batch Pendaftaran
                            </p>
                            <div className="mt-3 flex justify-end flex-row">
                                <div className="relative lg:w-[40%] md:w-[60%] w-full flex">
                                    <Input
                                        className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2] pr-10 h-[2.2rem]"
                                        placeholder="cari sesuai title/id"
                                        type="text"
                                    />
                                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                                        <FaSearch />
                                    </span>
                                </div>
                            </div>
                            <table className="table-auto w-full border-2 mt-2 text-white text-center">
                                <thead className="bg-[#1f2236]">
                                    <tr>
                                        <th className="border-2 border-[#1f2236] px-4 py-2">Action</th>
                                        <th className="border-2 border-[#1f2236] px-4 py-2">Switch</th>
                                        <th className="border-2 border-[#1f2236] px-4 py-2">Id</th>
                                        <th className="border-2 border-[#1f2236] px-4 py-2">Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataBatch.map((data) => (
                                        <tr key={data.idBatch}>
                                            <td className="border-2 border-[#1f2236] px-4 py-2 w-[10%]">
                                                <div className="flex flex-row justify-center">
                                                    <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] me-1">
                                                        <MdDelete className="cursor-pointer text-red-500" size={20} />
                                                    </div>
                                                    <Link href={`/admin/dashboard/${data.idBatch}`}>
                                                        <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] ms-1">
                                                            <FaExternalLinkAlt className="cursor-pointer text-white" size={20} />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="border-2 border-[#1f2236] px-4 py-2 w-[10%]">
                                                <Switch className="data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-gray-300"/>
                                            </td>
                                            <td className="border-2 border-[#1f2236] px-4 py-2">
                                                {data.idBatch}
                                            </td>
                                            <td className="border-2 border-[#1f2236] px-4 py-2">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>{data.title}</TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>{data.duration}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default BatchPage