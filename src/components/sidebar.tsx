'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { IoHomeOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import IconProject from '../../public/IconRemoverBg.png';
import Avatar from '../../public/avatar.jpg';

interface SideBarProps {
    category: string;
}

const SideBar: React.FC<SideBarProps> = ({ category }) => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isActive = (path: string) => pathname === path;

    return (
        <div
            className={`fixed top-0 left-0 h-screen bg-[#0b0d14] text-white border-r-2 border-[#1f2236] transition-all duration-300 ${isCollapsed ? 'w-13' : 'w-13 sm:w-40 lg:w-72'
                }`}
        >
            <div className="flex items-center justify-center mt-5 sm:hidden">
                <Image src={IconProject} alt="Logo" width={40} className='me-1' />
            </div>

            <div className="sm:hidden mt-4 border-b-2 border-[#1f2236]" />

            <div className="hidden sm:block">
                <div className="flex flex-row mt-3 p-5 justify-center border-b-2 border-[#1f2236]">
                    <Image src={IconProject} alt="Logo" className='w-[45px] lg:w-[50px]' />
                    <p className="ml-2 font-semibold md:text-lg lg:text-2xl">Eldovyn</p>
                </div>
            </div>

            <div className="hidden sm:block mt-5">
                <div className="flex flex-col justify-center border-b-2 border-[#1f2236] pb-5">
                    <div className="flex flex-col mb-3 ms-1 items-center justify-center">
                        <Image src={Avatar} alt="User Icon" width={65} height={65} className="rounded-full" />
                    </div>
                    <p className="ml-1 text-sm text-center">Andana Farras Pramudita</p>
                </div>
            </div>

            <ul className="text-white mt-3 overflow-hidden">
                {category === 'user' && (
                    <>
                        <li>
                            <Link
                                href="/"
                                className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer rounded-sm ${isActive('/')
                                    ? 'bg-[#4b5fe2] w-full'
                                    : 'hover:bg-[#1f2236]'
                                    }`}
                            >
                                <IoHomeOutline size={22} className="me-1" />
                                <p className="text-sm hidden sm:block lg:block">Home</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/profile"
                                className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer rounded-sm ${isActive('/profile')
                                    ? 'bg-[#4b5fe2]'
                                    : 'hover:bg-[#1f2236]'
                                    }`}
                            >
                                <VscAccount size={22} className="me-1" />
                                <p className="text-sm hidden sm:block lg:block">Profile</p>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default SideBar;
