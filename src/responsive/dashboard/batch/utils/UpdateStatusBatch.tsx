import { Switch } from "@/components/ui/switch";
import React from "react";
import { useFormik } from "formik";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";
import { Batch } from "@/interfaces/Batch";
import { BatchPagination } from "@/interfaces/BatchPagination";
import { User } from "@/interfaces/User";

interface ApiResponse {
    data: Batch | null;
    message: string;
    errors: {
        [field: string]: string[];
    } | null;
    page: BatchPagination | null;
    user: User | null;
}

interface Props {
    batchId: string;
    isActive: boolean;
}

const UpdateStatusBatch: React.FC<Props> = ({ batchId,isActive }) => {
    const formik = useFormik({
        initialValues: {
            isEnabled: isActive,
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axiosInstance.patch<ApiResponse>(`/job-entry/admin/batch/status`,
                    { batch_id: batchId },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${Cookies.get('accessToken') || ''}`
                        }
                    });
                const resp = response.data;
                if (response.status === 201) {
                    formik.setFieldValue('isEnabled', resp.data?.is_active);
                }
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
            <div
                className="flex justify-center w-full items-center h-5 bg-transparent border-none cursor-pointer"
            >
                <Switch
                    checked={formik.values.isEnabled}
                    onCheckedChange={async (checked) => {
                        await formik.setFieldValue('isEnabled', checked);
                        formik.submitForm();
                    }}
                    className="data-[state=checked]:bg-gray-300 data-[state=unchecked]:bg-red-500"
                />
            </div>
        </form>
    );
};

export default UpdateStatusBatch;
