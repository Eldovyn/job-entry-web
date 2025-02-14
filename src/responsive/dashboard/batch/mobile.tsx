import NavBar from "@/components/navbar";
import React, { Dispatch, SetStateAction } from "react";
import SearchBatch from "./utils/SearchBatch";
import Link from "next/link";

interface Pagination {
    current_page: number;
    items_per_page: number;
    limit: number | null;
    next_page: number | null;
    previous_page: number | null;
    total_items: number;
    total_pages: number;
    current_batch: Batch[];
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

interface Batch {
    batch_id: string;
    created_at: number;
    description: string;
    title: string;
    updated_at: number;
    user_id: string;
    author: string
    is_active: boolean
}

interface SuccessResponse {
    data: Batch[];
    message: string;
    page: Pagination;
    user: User;
}

interface Props {
    data: SuccessResponse
}

const MobileBatch: React.FC<Props> = ({ data }) => {
    return (
        <>
            <NavBar category="admin" />
            <div className="bg-[#0b0d14] min-h-screen flex items-center justify-center md:w-[95%] lg:w-[90%] w-full pt-5 pb-5">
                <div className="bg-[#12141e] w-[90%] border-2 p-4 rounded-md border-[#1f2236]">
                    <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
                        Batch Pendaftaran
                    </p>
                    <div className="mt-3 flex justify-end flex-row">
                        <SearchBatch category="admin" />
                    </div>
                    {data?.data?.map((data) => (
                        <Link href={`/admin/dashboard/${data.batch_id}`} key={data.batch_id}>
                            <div className="border-2 rounded-md border-[#1f2236] mt-2 p-3 flex justify-between items-center text-white overflow-hidden text-ellipsis" key={data.batch_id}>
                                <p className="text-center">{data.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
};

export default MobileBatch