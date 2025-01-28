'use client';
import Icon from '@/../public/IconRemoverBg.png';
import Image from "next/image";
import { Navbar } from "flowbite-react";
import { useMediaQuery } from "react-responsive";
import React, { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { VscAccount } from 'react-icons/vsc';
import { IoHomeOutline } from 'react-icons/io5';
import { IoMdExit } from 'react-icons/io';
import { GoDatabase } from "react-icons/go";
import { CiBoxList } from "react-icons/ci";

interface Props {
    category: string;
}

const NavBar: React.FC<Props> = ({ category }) => {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);
    const isActive = (path: string) => pathname === path;

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 768 });
    const isMobile = useMediaQuery({ maxWidth: 425, minWidth: 320 });
    const isSmallMobile = useMediaQuery({ maxWidth: 319 });

    if (!isClient) {
        return null;
    }

    return (
        <>
            <Navbar fluid className="bg-[#12141e] sticky top-0 z-50">
                <Navbar.Brand href="https://flowbite-react.com">
                    <Image src={Icon} className="mr-3 h-[25px] w-[40px]" alt="Flowbite React Logo" />
                    <span className={`self-center whitespace-nowrap text-xl font-semibold text-white ${isSmallMobile ? 'hidden' : ''}`}>Eldovyn</span>
                </Navbar.Brand>
                <Navbar.Toggle className='bg-transparent hover:bg-transparent focus:ring-transparent' />
                <Navbar.Collapse>
                    {category === 'user' && (
                        <>
                            <Navbar.Link href="/" className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer rounded-sm border-b-transparent text-white ${isActive('/')
                                ? 'bg-[#4b5fe2]'
                                : 'hover:bg-[#1f2236]'
                                }`}>
                                <IoHomeOutline size={22} />
                                <p className="text-sm">Home</p>
                            </Navbar.Link>
                            <Navbar.Link href="/profile" className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer rounded-sm border-b-transparent text-white ${isActive('/profile')
                                ? 'bg-[#4b5fe2]'
                                : 'hover:bg-[#1f2236]'
                                }`}>
                                <VscAccount size={22} />
                                <p className="text-sm">Profile</p>
                            </Navbar.Link>
                        </>
                    )}
                    {category === 'admin' && (
                        <>
                            <Navbar.Link href="/admin/dashboard/batch" className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer rounded-sm border-b-transparent text-white ${isActive('/')
                                ? 'bg-[#4b5fe2]'
                                : 'hover:bg-[#1f2236]'
                                }`}>
                                <CiBoxList size={22} />
                                <p className="text-sm">Batch</p>
                            </Navbar.Link>
                            <Navbar.Link href="/admin/dashboard/data-mahasiswa" className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer rounded-sm border-b-transparent text-white ${isActive('/')
                                ? 'bg-[#4b5fe2]'
                                : 'hover:bg-[#1f2236]'
                                }`}>
                                <GoDatabase size={22} />
                                <p className="text-sm">Data Mahasiswa</p>
                            </Navbar.Link>
                        </>
                    )}
                    <Navbar.Link href="/profile" className={`flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer rounded-sm border-b-transparent text-white hover:bg-[#1f2236]`}>
                        <IoMdExit size={22} />
                        <p className="text-sm">Logout</p>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar