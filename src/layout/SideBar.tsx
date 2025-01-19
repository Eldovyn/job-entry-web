'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Gambar from '/public/people_icon.png';

interface SidebarProps {
    category: String;
}

const Sidebar: React.FC<SidebarProps> = ({ category }) => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isActive = (path: string) => pathname === path;

    return (
        <div className="flex">
            <div
                className={`fixed top-0 left-0 h-screen bg-white border-r transition-all duration-300 ${isCollapsed
                        ? 'w-20'
                        : 'w-20 sm:w-40 md:w-40 lg:w-72 xl:w-72'
                    }`}
            >
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 m-3 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                    {isCollapsed ? '➡️' : '⬅️'}
                </button>

                <ul className="text-[#515151] mt-5">
                    <li>
                        <Link
                            href="/dasbor-admin"
                            className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer ${isActive('/dasbor-admin')
                                    ? 'bg-[#F2F3FF] border-r-4 border-primary'
                                    : ''
                                }`}
                        >
                            <Image src={Gambar} alt="Dasbor Icon" width={24} height={24} />
                            {!isCollapsed && (
                                <p className="hidden sm:block lg:block">Dasbor</p>
                            )}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/janji-temu"
                            className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer ${isActive('/janji-temu')
                                    ? 'bg-[#F2F3FF] border-r-4 border-primary'
                                    : ''
                                }`}
                        >
                            <Image src={Gambar} alt="Janji Temu Icon" width={24} height={24} />
                            {!isCollapsed && (
                                <p className="hidden sm:block lg:block">Janji Temu</p>
                            )}
                        </Link>
                    </li>
                </ul>
            </div>
            <div
                className={`flex-1 ml-20 sm:ml-40 md:ml-40 lg:ml-72 xl:ml-72 p-8 overflow-y-auto`}
            >
                {
                    category === 'coba' ? (
                        <>
                            <p>Coba</p>
                        </>
                    ) : ''
                }
            </div>
        </div>
    );
};

export default Sidebar;
