'use client';
import Icon from '@/../public/IconRemoverBg.png';
import Image from "next/image";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import ProfileAvatar from '@/../public/avatar.jpg';

const NavBar = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 768 });
    const isMobile = useMediaQuery({ maxWidth: 320, minWidth: 425 });
    const isUltraMobile = useMediaQuery({ maxWidth: 319 });

    if (!isClient) {
        return null;
    }

    return (
        <>
            <Navbar fluid className="bg-[#12141e]">
                <Navbar.Brand href="https://flowbite-react.com">
                    <Image src={Icon} className="mr-3 h-[25px] w-[40px]" alt="Flowbite React Logo" />
                    {!isMobile && !isUltraMobile ? (
                        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Eldovyn</span>
                    ) : ''}
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            !isMobile && !isUltraMobile ? (
                                <Avatar alt="User settings" img={ProfileAvatar.src} rounded className={isTablet ? 'me-1' : ''} />
                            ) : ''
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link href="#" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                    <Navbar.Link href="#">Services</Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar