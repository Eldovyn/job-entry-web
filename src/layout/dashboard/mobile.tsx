import NavBar from "@/components/navbar";
import React from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

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

interface Props {
    dataMahasiswa: DataMahasiswa[];
}

const MobileDashboard: React.FC<Props> = ({ dataMahasiswa }) => {
    return (
        <>
            <NavBar category="admin"/>
            <div className="bg-[#0b0d14] min-h-screen flex items-center justify-center w-full pb-[3rem]">
                <div className="border-[#1f2236] bg-[#12141e] w-[90%] border-2 p-8 rounded-md">
                    <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
                        Data Mahasiswa
                    </p>
                    <div className="mt-3 flex justify-end flex-row">
                        <div className="relative lg:w-[40%] md:w-[60%] w-full flex">
                            <Input
                                className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2] pr-10 h-[2.2rem]"
                                placeholder="cari sesuai nama/npm"
                                type="text"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <FaSearch />
                            </span>
                        </div>
                    </div>
                    {dataMahasiswa.map((mahasiswa) => (
                        <p className="text-center border rounded-md border-[#1f2236] mt-2 p-3 flex justify-center items-center text-white" key={mahasiswa.npm}>
                            {mahasiswa.name}
                        </p>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MobileDashboard;