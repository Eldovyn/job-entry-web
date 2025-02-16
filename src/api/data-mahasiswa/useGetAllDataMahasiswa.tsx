import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { MahasiswaPagination } from "@/interfaces/MahasiswaPagination";
import { User } from "@/interfaces/User";
import { UserForm } from "@/interfaces/userForm";

interface ApiResponse {
    data: UserForm[];
    message: string;
    page: MahasiswaPagination;
    user: User;
}


const useGetUserAllDataMahasiswa = (currentPage: string, q: string, token: string) => {
    return useQuery({
        queryKey: ["get-all-mahasiswa", currentPage, q],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse>("/job-entry/data-mahasiswa", {
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

export { useGetUserAllDataMahasiswa }