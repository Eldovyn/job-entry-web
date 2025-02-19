import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SideBar from "@/components/sidebar";
import { useMediaQuery } from "react-responsive";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { User } from "@/interfaces/User";
import { MahasiswaPagination } from "@/interfaces/MahasiswaPagination";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import SearchDataMahasiswa from "./utils/SearchDataMahasiswa";
import * as XLSX from "xlsx";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";
import DeleteMahasiswa from "./utils/DeleteMahasiswa";

interface Props {
    pagination: MahasiswaPagination | null;
    isDesktop: boolean;
    user: User | null
    setPagination: Dispatch<SetStateAction<MahasiswaPagination | null>>
}

const ExportExcel: React.FC<{ data: any[]; fileName: string, currentPage: string, q: string }> = ({ data, fileName, currentPage, q }) => {
    const exportToExcel = async() => {
        console.log('muncul')
        const response = await axiosInstance.get('/job-entry/export/data-mahasiswa', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('accessToken') || ''}`
            },
            params: {
                current_page: currentPage,
                q: q
            }
        })
        if (response.status == 200) {
            const worksheet = XLSX.utils.json_to_sheet(response.data.page.current_data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, `${fileName}.xlsx`);
        }
    };

    return (
        <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={exportToExcel}>
            export
        </Button>
    );
};

const TabletDesktopDashboard: React.FC<Props> = ({ setPagination, pagination, isDesktop, user }) => {
    const [isClient, setIsClient] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        setTimeout(() => {
            setIsClient(true);
        }, 100);
    }, []);

    const isTablet = useMediaQuery({ minWidth: 630, maxWidth: 853 });
    const isSmallTablet = useMediaQuery({ minWidth: 525, maxWidth: 630 });
    const isExtraSmallTablet = useMediaQuery({ minWidth: 426, maxWidth: 525 });

    if (!isClient) {
        return null;
    }

    return (
        <>
            <div className="flex bg-[#0b0d14]">
                <SideBar category="admin" user={user} />
                <main className={`flex-1 ml-20 sm:ml-40 lg:ml-72 ${isSmallTablet ? 'p-2 me-6' : ''} ${isTablet || isDesktop ? 'p-8' : ''} ${isExtraSmallTablet ? 'p-2 me-7' : ''} h-screen bg-[#0b0d14] flex items-center justify-center`}>
                    <div className="h-screen bg-[#0b0d14] flex items-center justify-center md:w-[95%] lg:w-[90%] w-full">
                        <div className="bg-[#12141e] w-full border-2 p-8 rounded-md border-[#1f2236]">
                            <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
                                Data Mahasiswa
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="flex justify-center items-center mt-3">
                                    <ExportExcel currentPage={searchParams.get('current_page') || '1'} q={searchParams.get('q') || ''} data={pagination?.current_data || []} fileName="exported_data" />
                                </div>
                                <div className="mt-3 flex justify-end flex-row w-full">
                                    <SearchDataMahasiswa />
                                </div>
                            </div>
                            {isDesktop && pagination?.current_data && pagination?.current_data.length > 0 ? (
                                <table className="table-auto w-full border-2 mt-2 text-white text-center">
                                    <thead className="bg-[#1f2236]">
                                        <tr>
                                            <th className="border-2 border-[#1f2236] px-4 py-2">Action</th>
                                            <th className="border-2 border-[#1f2236] px-4 py-2">Nama</th>
                                            <th className="border-2 border-[#1f2236] px-4 py-2">NPM</th>
                                            <th className="border-2 border-[#1f2236] px-4 py-2">Kelas</th>
                                            <th className="border-2 border-[#1f2236] px-4 py-2">Lokasi Kampus</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagination?.current_data.map((mahasiswa) => (
                                            <tr key={mahasiswa.is_submit}>
                                                <td className="border-2 border-[#1f2236] px-4 py-2">
                                                    <div className="flex flex-row justify-center">
                                                        <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] me-1">
                                                            <DeleteMahasiswa setPagination={setPagination} pagination={pagination} userId={mahasiswa.user_id} />
                                                        </div>
                                                        <Link href={`/admin/dashboard/${mahasiswa.npm}`}>
                                                            <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] ms-1">
                                                                <FaExternalLinkAlt className="cursor-pointer text-white" size={20} />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="border-2 border-[#1f2236] px-4 py-2">
                                                    {mahasiswa.nama}
                                                </td>
                                                <td className="border-2 border-[#1f2236] px-4 py-2">{mahasiswa.npm}</td>
                                                <td className="border-2 border-[#1f2236] px-4 py-2">{mahasiswa.kelas}</td>
                                                <td className="border-2 border-[#1f2236] px-4 py-2">{mahasiswa.lokasi_kampus}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : ''}
                            {isTablet && (
                                pagination?.current_data.map((mahasiswa) => (
                                    <div className="border rounded-md border-[#1f2236] mt-2 p-3 flex justify-between items-center text-white" key={mahasiswa.is_submit}>
                                        <div className="flex flex-row justify-center">
                                            <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] me-1">
                                                <DeleteMahasiswa setPagination={setPagination} pagination={pagination} userId={mahasiswa.user_id} />
                                            </div>
                                            <Link href={`/admin/dashboard/${mahasiswa.npm}`}>
                                                <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] ms-1">
                                                    <FaExternalLinkAlt className="cursor-pointer text-white" size={20} />
                                                </div>
                                            </Link>
                                        </div>
                                        <p className="text-center">{mahasiswa.nama}</p>
                                        <p className="text-center">{mahasiswa.npm}</p>
                                    </div>
                                ))
                            )}
                            {isSmallTablet && (
                                pagination?.current_data.map((mahasiswa) => (
                                    <div className="border rounded-md border-[#1f2236] mt-2 p-3 flex justify-between items-center text-white" key={mahasiswa.is_submit}>
                                        <div className="flex flex-row justify-center">
                                            <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] me-1">
                                                <DeleteMahasiswa setPagination={setPagination} pagination={pagination} userId={mahasiswa.user_id} />
                                            </div>
                                            <Link href={`/admin/dashboard/${mahasiswa.npm}`}>
                                                <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] ms-1">
                                                    <FaExternalLinkAlt className="cursor-pointer text-white" size={20} />
                                                </div>
                                            </Link>
                                        </div>
                                        <p className="text-center">{mahasiswa.nama}</p>
                                    </div>
                                ))
                            )}
                            {isExtraSmallTablet && (
                                pagination?.current_data.map((mahasiswa) => (
                                    <p className="text-center border rounded-md border-[#1f2236] mt-2 p-3 flex justify-center items-center text-white" key={mahasiswa.is_submit}>
                                        {mahasiswa.nama}
                                    </p>
                                ))
                            )}
                            {pagination?.current_data && pagination?.current_data.length > 0 ? (
                                <Pagination className="mt-3">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationLink
                                                href={`?currentPage=${pagination?.previous_page || 1}&q=${searchParams.get('q') || ''}`}
                                                className="bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[5rem]"
                                            >
                                                Previous
                                            </PaginationLink>
                                        </PaginationItem>
                                        <Button className="bg-[#4b5563] text-white hover:bg-[#4b5563] hover:text-white w-[2.5rem]">
                                            {pagination?.current_page}
                                        </Button>
                                        <PaginationItem>
                                            <PaginationLink
                                                href={`?currentPage=${pagination?.next_page || pagination?.total_pages}&q=${searchParams.get('q') || ''}`}
                                                className="bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[5rem]"
                                            >
                                                Next
                                            </PaginationLink>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            ) : ''}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default TabletDesktopDashboard