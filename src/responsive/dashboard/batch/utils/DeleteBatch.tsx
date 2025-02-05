import { MdDelete } from "react-icons/md";
import React, { Dispatch, SetStateAction } from "react";
import { useFormik } from "formik";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";

interface DataBatch {
    batch_id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    author: string;
    is_active: boolean;
}

interface Props {
    batchId: string
    setDataBatch: Dispatch<SetStateAction<DataBatch[] | []>>;
}

const DeleteBatch: React.FC<Props> = ({ batchId, setDataBatch }) => {
    const { push } = useRouter();
    const searchParams = useSearchParams();

    const formik = useFormik({
        initialValues: {},
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axiosInstance.delete(`/job-entry/admin/batch`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${Cookies.get('accessToken') || ''}`
                    },
                    data: { batch_id: batchId }
                });
                if (response.status === 201) {
                    setDataBatch(response.data?.page?.batches[0])
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