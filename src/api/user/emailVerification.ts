import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useEmailVerification = (token: string) => {
    return useQuery({
        queryKey: ["email-verification", token],
        queryFn: async () => {
            const response = await axiosInstance.get(`/job-entry/account-active/email-verification`, {
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