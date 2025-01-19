'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { IoHomeOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { useMediaQuery } from 'react-responsive'
import IconProject from '../../public/IconRemoverBg.png';
import Avatar from '../../public/avatar.jpg';

interface SidebarProps {
    category: String;
}

const Sidebar: React.FC<SidebarProps> = ({ category }) => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isSm = useMediaQuery({
        query: '(max-width: 640px)'
    })

    const isActive = (path: string) => pathname === path;

    return (
        <div className="flex">
            <div
                className={`fixed top-0 left-0 h-screen text-white bg-[#0b0d14] border-r transition-all duration-300 ${isCollapsed
                    ? 'w-20'
                    : 'w-20 sm:w-40 md:w-40 lg:w-72 xl:w-72'
                    } ${isSm && isCollapsed ? 'w-full' : ''}`}
            >
                {/* <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 m-3 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                    {isCollapsed ? '➡️' : '⬅️'}
                </button> */}
                {isSm ? <Image src={IconProject} alt="Logo" className={`w-[45px] mt-5 ${isSm && 'ms-3'}`} /> : (
                    <>
                        <div className="flex flex-row mt-3 p-5 justify-center">
                            <Image src={IconProject} alt="Logo" width={50} />
                            <p className='ml-1 font-semibold'>Eldovyn</p>
                        </div>
                        <hr className='border-[#1b1d2e] border-1'/>
                        <br />
                    </>
                )}
                {
                    !isSm && (
                        <>
                            <div className="flex flex-col justify-center">
                                <div className="flex flex-col mb-3 ms-1 items-center justify-center">
                                    <Image src={Avatar} alt="User Icon" width={50} height={50} className="rounded-full" />
                                </div>
                                <p className='ml-1 text-sm text-center'>Andana Farras Pramudita</p>
                            </div>
                            <br />
                            <hr className='border-[#1b1d2e] border-1'/>
                        </>
                    )
                }
                <ul className="text-white mt-5 ms-1">
                    <li>
                        <Link
                            href="#"
                            className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer ${isActive('/dasbor-admin')
                                ? 'border-r-4 border-primary'
                                : ''
                                }`}
                        >
                            <IoHomeOutline size={22} className={`${isSm && 'ms-2'}`}/>
                            {!isCollapsed && (
                                <p className="text-sm hidden sm:block lg:block">Home</p>
                            )}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer ${isActive('/janji-temu')
                                ? 'border-r-4 border-primary'
                                : ''
                                }`}
                        >
                            <VscAccount size={22} className={`${isSm && 'ms-2'}`}/>
                            {!isCollapsed && (
                                <p className="text-sm hidden sm:block lg:block">Profile</p>
                            )}
                        </Link>
                    </li>
                </ul>
            </div>
            <div
                className={`flex-1 ml-20 sm:ml-40 md:ml-40 lg:ml-72 xl:ml-72 p-8 overflow-y-auto`}
            >
                {
                    category === 'profile' ? (
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
