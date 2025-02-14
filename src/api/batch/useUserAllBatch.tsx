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


const useUserAllBatch = (currentPage: string, q: string, token: string) => {
    return useQuery({
        queryKey: ["get-all-batch", currentPage, q],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse>("/job-entry/user/search/batch", {
                params: { current_page: currentPage, q: q },
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

export { useUserAllBatch }