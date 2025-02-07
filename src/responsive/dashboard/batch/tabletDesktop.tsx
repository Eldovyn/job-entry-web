import SideBar from "@/components/sidebar"
import React, { SetStateAction, Dispatch } from "react";
import { useMediaQuery } from "react-responsive";
import SearchBatch from "./utils/SearchBatch";
import BatchPagination from "./utils/BatchPagination";
import DeleteBatch from "./utils/DeleteBatch";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    pagination: Pagination | null;
    isDesktop: boolean
    setPagination: Dispatch<SetStateAction<Pagination | null>>;
}

const TabletDesktop: React.FC<Props> = ({ pagination, data, isDesktop, setPagination }) => {
    const isTablet = useMediaQuery({ minWidth: 745, maxWidth: 853 });
    const isSmallTablet = useMediaQuery({ minWidth: 525, maxWidth: 745 });
    const isExtraSmallTablet = useMediaQuery({ minWidth: 426, maxWidth: 525 });

    const searchParams = useSearchParams();

    return (
        <>
            <div className="flex bg-[#0b0d14]">
                <SideBar category="admin" user={data?.user} />
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
                                <BatchPagination pagination={pagination} setPagination={setPagination} data={data as SuccessResponse} isDesktop={isDesktop} />
                            ) : ''}
                            {isSmallTablet || isExtraSmallTablet && pagination ? (
                                <>
                                    {pagination?.current_batch?.map((item) => (
                                        <div className="border rounded-md border-[#1f2236] mt-2 p-3 flex justify-between items-center text-white" key={item?.batch_id}>
                                            <p className="text-center truncate">{item?.title}</p>
                                            <DeleteBatch pagination={pagination} data={data as SuccessResponse} batchId={item.batch_id} setPagination={setPagination} />
                                        </div>
                                    ))}
                                    <Pagination className="mt-3">
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href={`?current_page=${pagination?.previous_page || 1}&q=${searchParams.get('q')}`}
                                                    className="bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[5rem]"
                                                >
                                                    Previous
                                                </PaginationLink>
                                            </PaginationItem>
                                            <Button className="bg-[#4b5563] text-white hover:bg-[#4b5563] hover:text-white w-[2.5rem]">
                                                {pagination?.current_page}
                                            </Button>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href={`?current_page=${pagination?.next_page || pagination?.total_pages}&q=${searchParams.get('q')}`}
                                                    className="bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[5rem]"
                                                >
                                                    Next
                                                </PaginationLink>
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </>
                            ) : ''}
                        </div>
                    </div>
                </main >
            </div >
        </>
    )
}

export default TabletDesktop