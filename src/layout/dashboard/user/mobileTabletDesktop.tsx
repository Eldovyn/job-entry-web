import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";

interface DataMahasiswa {
    name: string;
    noHp: string;
    tempatLahir: string;
    tanggalLahir: string;
    jenisKelamin: string;
    npm: string;
    kelas: string;
    lokasiKampus: string;
}

interface MobileTabletDesktopHomeProps {
    isMobile: boolean;
}

const MobileTabletDesktopDashboardUser: React.FC<MobileTabletDesktopHomeProps> = ({ isMobile }) => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page") || 0);

    const router = useRouter();

    const dataMahasiswa: DataMahasiswa = {
        name: "Andana Farras Pramudita",
        noHp: "081234567890",
        tempatLahir: "Bandung",
        tanggalLahir: "01-01-2000",
        jenisKelamin: "Laki-laki",
        npm: "20201001",
        kelas: "TI-2A",
        lokasiKampus: "Bandung",
    }

    const formFields = [
        <>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor='name' className="text-sm font-semibold text-white">
                    Name
                </label>
                <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.name}</p>
            </div>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor='noHp' className="text-sm font-semibold text-white">
                    No HP
                </label>
                <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.noHp}</p>
            </div>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor='tempatLahir' className="text-sm font-semibold text-white">
                    Tempat Lahir
                </label>
                <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.tempatLahir}</p>
            </div>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor='tanggalLahir' className="text-sm font-semibold text-white">
                    Tanggal Lahir
                </label>
                <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.tanggalLahir}</p>
            </div>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor='jenisKelamin' className="text-sm font-semibold text-white">
                    Jenis Kelamin
                </label>
                <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.jenisKelamin}</p>
            </div>
        </>,
        <>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor='name' className="text-sm font-semibold text-white">
                    NPM
                </label>
                <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.npm}</p>
            </div>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor='noHp' className="text-sm font-semibold text-white">
                    Kelas
                </label>
                <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.kelas}</p>
            </div>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor='tempatLahir' className="text-sm font-semibold text-white">
                    Lokasi Kampus
                </label>
                <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.lokasiKampus}</p>
            </div>
        </>,
        <>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor="cv" className="text-sm font-semibold text-white">
                    CV
                </label>
                <button
                    onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                    className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                >
                    {dataMahasiswa.name} - CV.pdf
                </button>
            </div>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor="cv" className="text-sm font-semibold text-white">
                    KRS
                </label>
                <button
                    onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                    className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                >
                    {dataMahasiswa.name} - CV.pdf
                </button>
            </div>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor="cv" className="text-sm font-semibold text-white">
                    Pass Foto
                </label>
                <button
                    onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                    className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                >
                    {dataMahasiswa.name} - CV.pdf
                </button>
            </div>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor="cv" className="text-sm font-semibold text-white">
                    KTM
                </label>
                <button
                    onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                    className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                >
                    {dataMahasiswa.name} - CV.pdf
                </button>
            </div>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor="cv" className="text-sm font-semibold text-white">
                    KTM
                </label>
                <button
                    onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                    className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                >
                    {dataMahasiswa.name} - CV.pdf
                </button>
            </div>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor="cv" className="text-sm font-semibold text-white">
                    KTP
                </label>
                <button
                    onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                    className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                >
                    {dataMahasiswa.name} - CV.pdf
                </button>
            </div>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor="cv" className="text-sm font-semibold text-white">
                    Rangkuman Nilai
                </label>
                <button
                    onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                    className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                >
                    {dataMahasiswa.name} - CV.pdf
                </button>
            </div>
            <div className="flex flex-col gap-2 pb-1">
                <label htmlFor="cv" className="text-sm font-semibold text-white">
                    Certificate
                </label>
                <button
                    onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                    className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                >
                    {dataMahasiswa.name} - CV.pdf
                </button>
            </div>
        </>
    ]

    useEffect(() => {
        if (isNaN(page) || page < 0 || page > formFields.length) {
            router.push("?page=0");
        }
    }, [page]);

    return (
        <>
            <div className="bg-[#0b0d14] min-h-screen flex items-center justify-center w-full pb-5">
                <div className={`bg-[#12141e] ${isMobile ? "w-[80%]" : "w-[65%]"} border-2 p-8 rounded-md mt-9 border-[#1f2236]`}>
                    <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">Data User</p>
                    <div className="flex flex-col mt-3">
                        {formFields[page]}
                    </div>
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
                                ))
                            ) : (
                                <PaginationItem>
                                    <PaginationLink
                                        href={`?page=${page}`}
                                        className={`${page === page ? "bg-gray-600 hover:bg-gray-700" : "bg-[#4b5fe2] hover:bg-[#4b5fe2]"} text-white hover:text-white`}
                                    >
                                        {page + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )}
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
            </div>
        </>
    );
};

export default MobileTabletDesktopDashboardUser