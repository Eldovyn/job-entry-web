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
import { BatchPagination as BPagination } from "@/interfaces/BatchPagination";
import { User } from "@/interfaces/User";

interface Props {
    pagination: BPagination | null;
    isDesktop: boolean
    setPagination: Dispatch<SetStateAction<BPagination | null>>;
    user: User | null
    category: string
}

const TabletDesktop: React.FC<Props> = ({ category, pagination, user, isDesktop, setPagination }) => {
    const isTablet = useMediaQuery({ minWidth: 745, maxWidth: 853 });
    const isSmallTablet = useMediaQuery({ minWidth: 525, maxWidth: 745 });
    const isExtraSmallTablet = useMediaQuery({ minWidth: 426, maxWidth: 525 });

    const searchParams = useSearchParams();

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
                                <SearchBatch category="admin" />
                            </div>
                            {isTablet || isDesktop ? (
                                <BatchPagination category={category} pagination={pagination} setPagination={setPagination} isDesktop={isDesktop} />
                            ) : ''}
                            {isSmallTablet || isExtraSmallTablet && pagination?.current_batch && pagination?.total_pages > 0 ? (
                                <>
                                    {pagination?.current_batch?.map((item) => (
                                        <div className="border rounded-md border-[#1f2236] mt-2 p-3 flex justify-between items-center text-white" key={item?.batch_id}>
                                            <p className="text-center truncate">{item?.title}</p>
                                            <DeleteBatch pagination={pagination} batchId={item.batch_id} setPagination={setPagination} />
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