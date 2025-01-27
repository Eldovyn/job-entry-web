import SideBar from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/ui/datePicker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import React from "react";
import { InputFile } from "@/app/page";

interface MobileTabletDesktopHomeProps {
    page: number;
    isMobile: boolean;
}

const MobileTabletDesktopHome: React.FC<MobileTabletDesktopHomeProps> = ({ page, isMobile }) => {
    const formFields = [
        [
            { id: "name", label: "Name", placeholder: "name" },
            { id: "noHp", label: "No HP", placeholder: "no hp" },
            { id: "tempatLahir", label: "Tempat Lahir", placeholder: "tempat lahir" },
            { id: "tanggalLahir", label: "Tanggal Lahir", component: <DatePickerDemo /> },
            {
                id: "jenisKelamin",
                label: "Jenis Kelamin",
                component: (
                    <Select>
                        <SelectTrigger className="w-full text-[#71717a] caret-white border-[#1b1d2e] border-2 active:border-[#4b5fe2]">
                            <SelectValue placeholder="jenis kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Laki Laki</SelectItem>
                            <SelectItem value="female">Perempuan</SelectItem>
                        </SelectContent>
                    </Select>
                ),
            },
        ],
        [
            { id: "npm", label: "NPM", placeholder: "npm" },
            { id: "kelas", label: "Kelas", placeholder: "kelas" },
            {
                id: "lokasiKampus",
                label: "Lokasi Kampus",
                component: (
                    <Select>
                        <SelectTrigger className="w-full text-[#71717a] caret-white border-[#1b1d2e] border-2 active:border-[#4b5fe2]">
                            <SelectValue placeholder="lokasi kampus" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="depok">Depok</SelectItem>
                            <SelectItem value="karawaci">Karawaci</SelectItem>
                            <SelectItem value="bekasi">Bekasi</SelectItem>
                        </SelectContent>
                    </Select>
                ),
            },
        ],
        [
            { id: "CV", label: "CV", component: <InputFile placeholder="cv" /> },
            { id: "KRS", label: "KRS", component: <InputFile placeholder="krs" /> },
            { id: "pasFoto", label: "Pas Foto", component: <InputFile placeholder="pas foto" /> },
            { id: "KTM", label: "KTM", component: <InputFile placeholder="KTM" /> },
            { id: "KTP", label: "KTP", component: <InputFile placeholder="KTP" /> },
            { id: "rangkumanNilai", label: "Rangkuman Nilai", component: <InputFile placeholder="rangkuman nilai" /> },
            { id: "certificate", label: "Certificate", component: <InputFile placeholder="certificate" /> },
        ],
    ];

    const renderFormPage = () => {
        return formFields[page]?.map((field, index) => (
            <div className="flex flex-col gap-2 pb-1" key={index}>
                <label htmlFor={field.id} className="text-sm font-semibold text-white">
                    {field.label}
                </label>
                {field.component || (
                    <Input
                        type="text"
                        id={field.id}
                        placeholder={field?.placeholder}
                        className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
                    />
                )}
            </div>
        ));
    };

    return (
        <>
            <div className="flex bg-[#0b0d14]">
                <SideBar />
                <main className="flex-1 ml-20 sm:ml-40 lg:ml-72 p-8 min-h-screen bg-[#0b0d14] flex items-center justify-center">
                    <div className="bg-[#12141e] md:w-[75%] lg:w-[60%] w-[85%] mx-auto p-5 rounded-md border-[#1f2236] border-2 flex flex-col">
                        <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] mb-3 pb-3">Batch 1</p>
                        <form>
                            {renderFormPage()}
                            <div className="flex justify-end border-b-2 border-[#1f2236] pb-3">
                                <Button
                                    type="submit"
                                    className="mt-3 bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[7rem]"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                        <Pagination className="mt-3">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationLink
                                        href={`?page=${Math.max(0, page - 1)}`}
                                        className="bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[5rem]"
                                    >
                                        Previous
                                    </PaginationLink>
                                </PaginationItem>
                                {!isMobile ? (
                                    [0, 1, 2].map((pg) => (
                                        <PaginationItem key={pg}>
                                            <PaginationLink
                                                href={`?page=${pg}`}
                                                className={`${pg === page ? "bg-gray-600 hover:bg-gray-700" : "bg-[#4b5fe2] hover:bg-[#4b5fe2]"} text-white hover:text-white`}
                                            >
                                                {pg + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))) : (
                                    <PaginationItem>
                                        <PaginationLink
                                            href={`?page=${page}`}
                                            className={`${page === page ? "bg-gray-600 hover:bg-gray-700" : "bg-[#4b5fe2] hover:bg-[#4b5fe2]"} text-white hover:text-white`}
                                        >
                                            {page + 1}
                                        </PaginationLink>
                                    </PaginationItem>)}
                                <PaginationItem>
                                    <PaginationLink
                                        href={`?page=${Math.min(2, page + 1)}`}
                                        className="bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[5rem]"
                                    >
                                        Next
                                    </PaginationLink>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </main>
            </div>
        </>
    )
}

export default MobileTabletDesktopHome