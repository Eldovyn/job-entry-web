import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { User } from "@/interfaces/User";

interface ApiResponse {
    data: User | null
    message: string
}


export const useMe = (token: string) => {
    return useQuery({
        queryKey: ["@me", token],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse>(`/job-entry/@me`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return response.data;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });
};