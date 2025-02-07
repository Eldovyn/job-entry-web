import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const usePageVerification = (token: string) => {
    return useQuery({
        queryKey: ["page-verification", token],
        queryFn: async () => {
            const response = await axiosInstance.get(`/job-entry/account-active/page-verification`, {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    token
                },
            });
            return response;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });
};