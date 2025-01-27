'use client';
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SideBar from "@/components/sidebar";
import { useMediaQuery } from 'react-responsive';

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

const Dashboard = () => {
    const [isClient, setIsClient] = useState(false);

    const isDesktop = useMediaQuery({ minWidth: 1025 });
    const isTablet = useMediaQuery({ minWidth: 807, maxWidth: 1024 });
    const isMobile = useMediaQuery({ minWidth: 321, maxWidth: 806 });
    const isUltraMobile = useMediaQuery({ maxWidth: 320 });

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const dataMahasiswa: DataMahasiswa[] = [
        {
            name: "Andana Farras Pramudita",
            noHp: "081234567890",
            tempatLahir: "Bandung",
            tanggalLahir: "01-01-2000",
            jenisKelamin: "Laki-laki",
            npm: "20201001",
            kelas: "TI-2A",
            lokasiKampus: "Bandung",
        },
        {
            name: "Andana Farras Pramudita",
            noHp: "081234567890",
            tempatLahir: "Bandung",
            tanggalLahir: "01-01-2000",
            jenisKelamin: "Laki-laki",
            npm: "20201002",
            kelas: "TI-2B",
            lokasiKampus: "Bandung",
        },
        {
            name: "Andana Farras Pramudita",
            noHp: "081234567890",
            tempatLahir: "Bandung",
            tanggalLahir: "01-01-2000",
            jenisKelamin: "Laki-laki",
            npm: "20201003",
            kelas: "TI-2C",
            lokasiKampus: "Bandung",
        }
    ];

    return (
        <div className="flex bg-[#0b0d14]">
            <SideBar category="admin" />
            <main className="flex-1 ml-20 sm:ml-40 lg:ml-72 p-8 h-screen bg-[#0b0d14] flex items-center justify-center">
                <div className="h-screen bg-[#0b0d14] flex items-center justify-center md:w-[95%] lg:w-[90%] w-full">
                    <div className="bg-[#12141e] w-full border-2 p-8 rounded-md border-[#1f2236]">
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
                        {isDesktop && (
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
                                    {dataMahasiswa.map((mahasiswa) => (
                                        <tr key={mahasiswa.npm}>
                                            <td className="border-2 border-[#1f2236] px-4 py-2">
                                                <div className="flex flex-row justify-center">
                                                    <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] me-1">
                                                        <MdDelete className="cursor-pointer text-red-500" size={20} />
                                                    </div>
                                                    <Link href={`/admin/dashboard/${mahasiswa.npm}`}>
                                                        <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] ms-1">
                                                            <FaExternalLinkAlt className="cursor-pointer text-white" size={20} />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="border-2 border-[#1f2236] px-4 py-2">{mahasiswa.name}</td>
                                            <td className="border-2 border-[#1f2236] px-4 py-2">{mahasiswa.npm}</td>
                                            <td className="border-2 border-[#1f2236] px-4 py-2">{mahasiswa.kelas}</td>
                                            <td className="border-2 border-[#1f2236] px-4 py-2">{mahasiswa.lokasiKampus}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {isTablet && (
                            dataMahasiswa.map((mahasiswa) => (
                                <div className="border rounded-md border-[#1f2236] mt-2 p-3 flex justify-between items-center text-white" key={mahasiswa.npm}>
                                    <div className="flex flex-row justify-center">
                                        <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] me-1">
                                            <MdDelete className="cursor-pointer text-red-500" size={20} />
                                        </div>
                                        <Link href={`/admin/dashboard/${mahasiswa.npm}`}>
                                            <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] ms-1">
                                                <FaExternalLinkAlt className="cursor-pointer text-white" size={20} />
                                            </div>
                                        </Link>
                                    </div>
                                    <p className="text-center">{mahasiswa.name}</p>
                                    <p className="text-center">{mahasiswa.npm}</p>
                                </div>
                            ))
                        )}
                        {(isMobile || isUltraMobile) && (
                            dataMahasiswa.map((mahasiswa) => (
                                <div className="border rounded-md border-[#1f2236] mt-2 p-3 flex justify-between items-center text-white" key={mahasiswa.npm}>
                                    <div className="flex flex-row justify-center">
                                        <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] me-1">
                                            <MdDelete className="cursor-pointer text-red-500" size={20} />
                                        </div>
                                        <Link href={`/admin/dashboard/${mahasiswa.npm}`}>
                                            <div className="border p-2 rounded-md bg-[#4b5fe2] border-[#1f2236] ms-1">
                                                <FaExternalLinkAlt className="cursor-pointer text-white" size={20} />
                                            </div>
                                        </Link>
                                    </div>
                                    <p className="text-center">{mahasiswa.name}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
