import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { MahasiswaPagination } from "@/interfaces/MahasiswaPagination";
import { User } from "@/interfaces/User";
import { UserForm } from "@/interfaces/userForm";

interface ApiResponse {
    data: UserForm;
    message: string;
    user: User;
}


const useGetDataMahasiswa = (q: string, token: string) => {
    return useQuery({
        queryKey: ["get-all-mahasiswa", q],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse>("/job-entry/details/data-mahasiswa", {
                params: { q: q },
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

export { useGetDataMahasiswa }