import SideBar from "@/components/sidebar"
import React, { useEffect, useState, SetStateAction, Dispatch } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import UpdateStatusBatch from "./utils/UpdateStatusBatch";
import { useMediaQuery } from "react-responsive";
import SearchBatch from "./utils/SearchBatch";
import DeleteBatch from "./utils/DeleteBatch";

interface DataBatch {
    batch_id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    author: string;
    is_active: boolean;
}

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
    dataBatch: DataBatch[]
    isDesktop: boolean
    user: User
    setDataBatch: Dispatch<SetStateAction<DataBatch[] | []>>;
}

const TabletDesktop: React.FC<Props> = ({ dataBatch, isDesktop, user, setDataBatch }) => {
    const isTablet = useMediaQuery({ minWidth: 745, maxWidth: 853 });
    const isSmallTablet = useMediaQuery({ minWidth: 525, maxWidth: 745 });
    const isExtraSmallTablet = useMediaQuery({ minWidth: 426, maxWidth: 525 });

    return (
        <>
            <div className="flex bg-[#0b0d14]">
                <SideBar category="admin" user={user} />
                <main className={`flex-1 ml-20 sm:ml-40 lg:ml-72 p-8 bg-[#0b0d14] flex items-center justify-center`}>
                    <div className="h-screen bg-[#0b0d14] flex items-center justify-center md:w-[95%] lg:w-[90%] w-full">
                        <div className="bg-[#12141e] w-full border-2 p-8 rounded-md border-[#1f2236]">
                            <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
                                Batch Pendaftaran
                            </p>
                            <div className="mt-3 flex justify-end flex-row">
                                <SearchBatch />
                            </div>
                            {isTablet || isDesktop ? (
                                <>
                                    <table className="table-auto w-full border-2 mt-2 text-white text-center">
                                        <thead className="bg-[#1f2236]">
                                            <tr>
                                                <th className="border-2 border-[#1f2236] px-4 py-2">Action</th>
                                                <th className="border-2 border-[#1f2236] px-4 py-2">Switch</th>
                                                <th className="border-2 border-[#1f2236] px-4 py-2">Title</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataBatch?.map((data) => (
                                                <tr key={data.batch_id}>
                                                    <td className="border-2 border-[#1f2236] px-4 py-2 w-[10%]">
                                                        <div className="flex flex-row justify-center">
                                                            <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] me-1">
                                                                <DeleteBatch batchId={data.batch_id} setDataBatch={setDataBatch} />
                                                            </div>
                                                            <Link href={`/admin/dashboard/${data.batch_id}`}>
                                                                <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] ms-1">
                                                                    <FaExternalLinkAlt className="cursor-pointer text-white" size={20} />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="border-2 border-[#1f2236] px-4 py-2 w-[10%]">
                                                        <UpdateStatusBatch isActive={data.is_active} batchId={data.batch_id} setDataBatch={setDataBatch} />
                                                    </td>
                                                    <td className="border-2 border-[#1f2236] px-4 py-2">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>{data.title}</TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>{data.batch_id}</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            ) : ''}
                            {isSmallTablet || isExtraSmallTablet ? (
                                dataBatch?.map((data) => (
                                    <div className="border rounded-md border-[#1f2236] mt-2 p-3 flex justify-between items-center text-white" key={data.batch_id}>
                                        <p className="text-center">{data.title}</p>
                                    </div>
                                ))
                            ) : ''}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default TabletDesktop