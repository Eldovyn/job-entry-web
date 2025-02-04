import NavBar from "@/components/navbar";
import React from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

interface DataBatch {
    batch_id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    author: string;
    is_active: boolean;
}

interface Props {
    dataBatch: DataBatch[]
}

const MobileBatch: React.FC<Props> = ({ dataBatch }) => {
    return (
        <>
            <NavBar category="admin" />
            <div className="h-screen bg-[#0b0d14] flex items-center justify-center md:w-[95%] lg:w-[90%] w-full">
                <div className="bg-[#12141e] w-[90%] border-2 p-4 rounded-md border-[#1f2236]">
                    <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
                        Batch Pendaftaran
                    </p>
                    <div className="mt-3 flex justify-end flex-row">
                        <div className="relative lg:w-[40%] md:w-[60%] w-full flex">
                            <Input
                                className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2] pr-10 h-[2.2rem]"
                                placeholder="cari sesuai title/id"
                                type="text"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <FaSearch />
                            </span>
                        </div>
                    </div>
                    {dataBatch.map((data) => (
                        <Link href={`/admin/dashboard/${data.batch_id}`} key={data.batch_id}>
                            <div className="border rounded-md border-[#1f2236] mt-2 p-3 flex justify-between items-center text-white overflow-hidden text-ellipsis" key={data.batch_id}>
                                <p className="text-center">{data.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
};

export default MobileBatch