'use client'
import { useState } from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useGetDataMahasiswa } from "@/api/data-mahasiswa/useGetDataMahasiswa";
import { UserForm } from "@/interfaces/userForm";
import { Button } from "@/components/ui/button";

const Page = () => {
    const searchParams = useSearchParams()
    const [page, setPage] = useState(1);

    const { data: dataMahasiswa, isLoading: isLoadingDataMahasiswa, isError: isErrorDataMahasiswa, error: errorDataMahasiswa } = useGetDataMahasiswa(searchParams.get("q") || "", Cookies.get('accessToken') || '');

    const page1Fields = ["nama", "email", "tempat_tanggal_lahir", "jenis_kelamin", "alamat", "no_hp"];
    const page2Fields = ["npm", "kelas", "jurusan", "lokasi_kampus", "posisi", "ipk"];
    const page3Fields = ["cv", "ktm", "krs", "pas_foto", "ktp", "rangkuman_nilai", "certificate"];

    const renderFields = (fields: string[]) => (
        fields.map((field) => (
            <div key={field} className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-1">{field.replace('_', ' ')}</label>
                <p className="text-white border-[#1b1d2e] border-2 px-3 py-2 rounded-md">
                    {dataMahasiswa?.data[field as keyof UserForm] || '-'}
                </p>
            </div>
        ))
    );

    return (
        <>
            <div className="min-h-screen flex justify-center items-center">
                <div className="border-2 bg-[#0b0d14] border-[#1f2236] rounded-md p-8 w-[50%] mt-5 mb-5">
                    <p className="text-white font-semibold text-2xl border-b-2 border-[#1f2236] pb-3 text-center mb-3">{`Data ${dataMahasiswa?.data.nama}`}</p>
                    {page === 1 && renderFields(page1Fields)}
                    {page === 2 && renderFields(page2Fields)}
                    {page === 3 && (
                        page3Fields.map((field) => (
                            <div key={field} className="flex flex-col text-white mb-3">
                                <label className="text-sm font-semibold text-white mb-1">{field.replace('_', ' ')}</label>
                                <div className="flex flex-row justify-center items-center">
                                    <p className="ps-3 text-ellipsis overflow-hidden text-gray-400 w-full border-[#1b1d2e] border-t-2 border-b-2 py-1 border-s-2 rounded-s-md">
                                        {dataMahasiswa?.data[field as keyof UserForm] || '-' ? <a href={(dataMahasiswa?.data[field as keyof UserForm] || '-').toString()} target="_blank" rel="noopener noreferrer" className="text-blue-400">Lihat file</a> : 'No file selected'}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                    <div className="flex justify-between mt-4">
                        {page > 1 && <Button type="button" className="bg-[#4b5fe2] w-[6rem] hover:bg-[#4b5fe2]" onClick={() => setPage(page - 1)}>Previous</Button>}
                        {page < 3 ? (
                            <Button type="button" className="bg-[#4b5fe2] w-[6rem] hover:bg-[#4b5fe2]" onClick={() => setPage(page + 1)}>Next</Button>
                        ) : ''}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page