import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { BatchPagination } from "@/interfaces/BatchPagination";
import { User } from "@/interfaces/User";
import { Batch } from "@/interfaces/Batch";

interface ApiResponse {
    data: Batch[];
    message: string;
    page: BatchPagination;
    user: User;
}


const useGetFormSubmitted = (q: string, token: string) => {
    return useQuery({
        queryKey: ["get-form-submitted", q],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse>("/job-entry/form/is-submitted", {
                params: { q },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            return response.data;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });
};

export { useGetFormSubmitted }