'use client';
import Icon from '@/../public/IconRemoverBg.png';
import Image from "next/image";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import ProfileAvatar from '@/../public/avatar.jpg';
import { usePathname } from 'next/navigation';
import { VscAccount } from 'react-icons/vsc';
import { IoHomeOutline } from 'react-icons/io5';
import { IoMdExit } from 'react-icons/io';

const NavBar = () => {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);
    const isActive = (path: string) => pathname === path;

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 768 });
    const isMobile = useMediaQuery({ maxWidth: 425, minWidth: 320 });
    const isUltraMobile = useMediaQuery({ maxWidth: 319 });

    if (!isClient) {
        return null;
    }

    return (
        <>
            <Navbar fluid className="bg-[#12141e] sticky top-0 z-50">
                <Navbar.Brand href="https://flowbite-react.com">
                    <Image src={Icon} className="mr-3 h-[25px] w-[40px]" alt="Flowbite React Logo" />
                    <span className={`self-center whitespace-nowrap text-xl font-semibold text-white ${isUltraMobile ? 'hidden' : ''}`}>Eldovyn</span>
                </Navbar.Brand>
                <Navbar.Toggle className='bg-transparent hover:bg-transparent focus:ring-transparent' />
                <Navbar.Collapse>
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