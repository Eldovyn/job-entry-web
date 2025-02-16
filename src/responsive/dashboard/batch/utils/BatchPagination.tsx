import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import DeleteBatch from "./DeleteBatch";
import { FaExternalLinkAlt } from "react-icons/fa";
import UpdateStatusBatch from "./UpdateStatusBatch";
import React, { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import Link from "next/link";;
import { BatchPagination as BPagination } from "@/interfaces/BatchPagination";

interface Props {
    pagination: BPagination | null;
    isDesktop: boolean;
    setPagination: Dispatch<SetStateAction<BPagination | null>> | null;
    category: string
}

const BatchPagination: React.FC<Props> = ({ pagination, isDesktop, setPagination, category }) => {
    const searchParams = useSearchParams();

    if (category === 'admin') {
        return (
            <div>
                <table className="table-auto w-full border-2 mt-2 text-white text-center">
                    <thead className="bg-[#1f2236]">
                        <tr>
                            <th className="border-2 border-[#1f2236] px-4 py-2">Action</th>
                            <th className="border-2 border-[#1f2236] px-4 py-2">Switch</th>
                            <th className="border-2 border-[#1f2236] px-4 py-2">Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagination?.current_batch?.map((item) => (
                            <tr key={item.batch_id || `batch-${item.title}-${Math.random()}`}>
                                <td className="border-2 border-[#1f2236] px-4 py-2 w-[10%]">
                                    <div className="flex flex-row justify-center">
                                        <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] me-1">
                                            <DeleteBatch pagination={pagination} batchId={item.batch_id} setPagination={setPagination} />
                                        </div>
                                        <Link href={`/admin/dashboard/${item.batch_id}`}>
                                            <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] ms-1">
                                                <FaExternalLinkAlt className="cursor-pointer text-white" size={20} />
                                            </div>
                                        </Link>
                                    </div>
                                </td>
                                <td className="border-2 border-[#1f2236] px-4 py-2 w-[10%]">
                                    <UpdateStatusBatch isActive={item.is_active} batchId={item.batch_id} />
                                </td>
                                <td className="border-2 border-[#1f2236] px-4 py-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>{item.title}</TooltipTrigger>
                                            <TooltipContent>
                                                <p>{item.batch_id}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                    {pagination && (
                        <>
                            <Pagination className="mt-3">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationLink
                                            href={`?current_page=${pagination.previous_page || 1}&q=${searchParams.get('q')}`}
                                            className="bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[5rem]"
                                        >
                                            Previous
                                        </PaginationLink>
                                    </PaginationItem>
                                    {Array(pagination.total_pages).fill(1).map((_, i) => (
                                        <PaginationItem key={i + 1}>
                                            <PaginationLink
                                                href={`?current_page=${i + 1}&q=${searchParams.get('q')}`}
                                                className={`${i + 1 === pagination.current_page ? "bg-gray-600 hover:bg-gray-700" : "bg-[#4b5fe2] hover:bg-[#4b5fe2]"} text-white hover:text-white`}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationLink
                                            href={`?current_page=${pagination.next_page || pagination.total_pages}&q=${searchParams.get('q')}`}
                                            className="bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[5rem]"
                                        >
                                            Next
                                        </PaginationLink>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </>
                    )}
                </div>
            </div>
        );
    }

    if (category === 'user') {
        return (
            <div className="flex-col">
                {pagination?.current_batch.map((data) => (
                    <Link href={`/form?q=${data.batch_id}`} key={data.batch_id} target="_blank" rel="noopener noreferrer">
                        <div className="border-2 hover:border-[#4b5fe2] rounded-md border-[#1f2236] mt-2 p-3 flex justify-between items-center text-white overflow-hidden text-ellipsis" key={data.batch_id}>
                            <p className="text-center">{data.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }
};

export default BatchPagination;


