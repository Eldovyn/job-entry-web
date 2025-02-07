'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { IoHomeOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import IconProject from '../../public/IconRemoverBg.png';
import Avatar from '../../public/avatar.jpg';
import { IoMdExit } from "react-icons/io";
import { GoDatabase } from "react-icons/go";
import { CiBoxList } from "react-icons/ci";
import { LuLockOpen } from "react-icons/lu";

interface User {
    avatar: string;
    created_at: number;
    email: string;
    is_active: boolean;
    is_admin: boolean;
    updated_at: number;
    user_id: string;
    username: string;
}

interface SideBarProps {
    category: string;
    user?: User | null;
}

const SideBar: React.FC<SideBarProps> = ({ category, user }) => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isActive = (path: string) => pathname === path;

    return (
        <div
            className={`fixed top-0 left-0 min-h-screen bg-[#0b0d14] text-white border-r-2 border-[#1f2236] transition-all duration-300 ${isCollapsed ? 'w-13' : 'w-13 sm:w-40 lg:w-72'
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
                        <Image src={user?.avatar || Avatar.src} alt="User Icon" width={65} height={65} className="rounded-full w-[65px] h-[65px]" />
                    </div>
                    <p className="ml-1 text-sm font-semibold text-center">{user?.username}</p>
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
                    </>
                )}
                {category === 'admin' && (
                    <>
                        <li>
                            <Link
                                href="/admin/dashboard/add-batch"
                                className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer rounded-sm ${isActive('/admin/dashboard/add-batch')
                                    ? 'bg-[#4b5fe2] w-full'
                                    : 'hover:bg-[#1f2236]'
                                    }`}
                            >
                                <LuLockOpen size={22} className="me-1" />
                                <p className="text-sm hidden sm:block lg:block">Open</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/dashboard/batch"
                                className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer rounded-sm ${isActive('/admin/dashboard/batch')
                                    ? 'bg-[#4b5fe2] w-full'
                                    : 'hover:bg-[#1f2236]'
                                    }`}
                            >
                                <CiBoxList size={22} className="me-1" />
                                <p className="text-sm hidden sm:block lg:block">Batch</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/dashboard/data-mahasiswa"
                                className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer rounded-sm ${isActive('/admin/dashboard/data-mahasiswa')
                                    ? 'bg-[#4b5fe2] w-full'
                                    : 'hover:bg-[#1f2236]'
                                    }`}
                            >
                                <GoDatabase size={22} className="me-1" />
                                <p className="text-sm hidden sm:block lg:block">Data Mahasiswa</p>
                            </Link>
                        </li>
                    </>
                )}
                <li>
                    <Link
                        href={category === 'user' ? '/profile/user' : '/admin/dashboard/profile'}
                        className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer rounded-sm ${isActive(category === 'user' ? '/profile/user' : '/admin/dashboard/profile')
                            ? 'bg-[#4b5fe2]'
                            : 'hover:bg-[#1f2236]'
                            }`}
                    >
                        <VscAccount size={22} className="me-1" />
                        <p className="text-sm hidden sm:block lg:block">Profile</p>
                    </Link>
                </li>
                <li>
                    <button
                        onClick={() => console.log('Logout clicked')}
                        className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer rounded-sm hover:bg-[#1f2236] w-full`}
                    >
                        <IoMdExit size={22} className="me-1" />
                        <p className="text-sm hidden sm:block lg:block">Logout</p>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
