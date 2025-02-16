import { MdDelete } from "react-icons/md";
import React, { Dispatch, SetStateAction } from "react";
import { useFormik } from "formik";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { BatchPagination } from "@/interfaces/BatchPagination";
import { Batch } from "@/interfaces/Batch";
import { User } from "@/interfaces/User";

interface Props {
    pagination: BatchPagination | null
    batchId: string
    setPagination: Dispatch<SetStateAction<BatchPagination | null>> | null;
}

interface ApiResponse {
    data: Batch | null;
    message: string;
    errors: {
        [field: string]: string[];
    } | null;
    page: BatchPagination | null;
    user: User | null;
}

const DeleteMahasiswa: React.FC<Props> = ({ pagination, batchId, setPagination }) => {
    const { push } = useRouter();
    const searchParams = useSearchParams();

    const formik = useFormik({
        initialValues: {},
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axiosInstance.delete<ApiResponse>(`/job-entry/admin/batch`, {
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
                        if (setPagination) {
                            setPagination({
                                ...pagination,
                                ...responseData.page as BatchPagination,
                            })
                        }
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

export default DeleteMahasiswa