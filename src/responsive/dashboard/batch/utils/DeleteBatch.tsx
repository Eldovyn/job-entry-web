import { MdDelete } from "react-icons/md";
import React, { Dispatch, SetStateAction } from "react";
import { useFormik } from "formik";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";

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

interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
}

interface Props {
    data: SuccessResponse;
    pagination: Pagination | null
    batchId: string
    setPagination: Dispatch<SetStateAction<Pagination | null>>;
}

const DeleteBatch: React.FC<Props> = ({ pagination, data, batchId, setPagination }) => {
    const { push } = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number, q: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("current_page", newPage.toString());
        params.set("q", q);
        push(`?${params.toString()}`, { scroll: false });
    };

    const formik = useFormik({
        initialValues: {},
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axiosInstance.delete<SuccessResponse | ErrorResponse>(`/job-entry/admin/batch`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${Cookies.get('accessToken') || ''}`
                    },
                    data: { batch_id: batchId },
                    params: { current_page: searchParams.get('current_page'), q: searchParams.get('q') }
                });
                const responseData = response.data;
                if (response.status === 201) {
                    if ('page' in responseData) {
                        setPagination({
                            ...pagination,
                            ...responseData.page as Pagination,
                        })
                    }
                }
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <button
                    type="submit"
                    className="flex justify-center items-center w-5 h-5 bg-transparent border-none"
                >
                    <MdDelete className="cursor-pointer text-red-500" size={20} />
                </button>
            </form>
        </>
    )
}

export default DeleteBatch