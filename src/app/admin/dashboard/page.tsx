'use client';
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoExitOutline } from "react-icons/io5";
import { useMediaQuery } from 'react-responsive'
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isMobile = useMediaQuery({
        query: '(max-width: 640px) and (min-width: 320px)'
    })

    const isUltraMobile = useMediaQuery({
        query: '(max-width: 320px)'
    })

    const isTablet = useMediaQuery({
        query: '(min-width: 640px) and (max-width: 1024px)'
    })

    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    })

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
            npm: "20201001",
            kelas: "TI-2A",
            lokasiKampus: "Bandung",
        }
    ]

    return (
        <>
            <div className="h-screen bg-[#0b0d14] flex items-center justify-center">
                <div className="bg-[#12141e] w-[75%] border-2 p-8 rounded-md border-[#1f2236]">
                    <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
                        Data Mahasiswa
                    </p>
                    <div className="mt-3 flex justify-end flex-row">
                        <div className="relative lg:w-[30%] w-full flex">
                            <Input
                                className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2] pr-10 h-[2.2rem]"
                                placeholder="cari sesuai nama/npm"
                                type="text"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <FaSearch />
                            </span>
                        </div>
                        {!isMobile && !isUltraMobile ? (
                            <>
                                <Button className="bg-[#4b5fe2] hover:bg-[#4558cf] ms-3 lg:w-[10%] md:w-[20%] w-[30%] h-[2.2rem]">
                                    <div className="flex flex-row">
                                        <IoExitOutline className="text-white pt-1 pe-1" />
                                        <p className="text-white">Logout</p>
                                    </div>
                                </Button>
                            </>) : ''}
                    </div>
                    {isMobile || isUltraMobile ? (
                        <>
                            <Button className={`bg-[#4b5fe2] hover:bg-[#4558cf] mt-3 lg:w-[10%] md:w-[20%] ${isMobile ? 'w-[40%]' : ''} ${isUltraMobile ? 'w-[70%]' : ''} h-[2.05rem]`}>
                                <div className="flex flex-row">
                                    <IoExitOutline className="text-white pt-1 pe-1" />
                                    <p className="text-white">Logout</p>
                                </div>
                            </Button>
                        </>) : ''}
                    {isDesktop ? (
                        <>
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
                                <tbody className="text-center">
                                    {dataMahasiswa.map((mahasiswa, index) => (
                                        <tr key={index}>
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
                        </>) : ''}
                    {isTablet && !isDesktop ? (
                        dataMahasiswa.map((mahasiswa, index) => (
                            <>
                                <div className="border rounded-md border-[#1f2236] mt-2 p-3 flex justify-between items-center text-white" key={index}>
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
                            </>
                        ))
                    ) : ''}
                </div>
            </div>
        </>
    )
};

export default Dashboard;