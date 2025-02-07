'use client';
import React, { useState, useEffect } from "react";
import TabletDesktopProfile from "@/responsive/profile/tabletDesktop";
import MobileProfile from "@/responsive/profile/mobile";
import { useMe } from "@/api/user/me";
import { useMediaQuery } from 'react-responsive';
import Cookies from "js-cookie";

const Profile = () => {
    const { data, isLoading, isError, error } = useMe(Cookies.get('accessToken') || '');

    const [userData, setUserData] = useState(data?.data || null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isDesktop = useMediaQuery({ minWidth: 769 });
    const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 769 });
    const isMobile = useMediaQuery({ maxWidth: 426, minWidth: 320 });
    const isSmallMobile = useMediaQuery({ maxWidth: 320 });

    if (!isClient) {
        return null;
    }

    if (isDesktop || isTablet) {
        return <TabletDesktopProfile 
            user={userData || null} 
            setUserData={setUserData}
            isDesktop={isDesktop}
            isTablet={isTablet}
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
            category='user'
        />
    }

    if (isMobile || isSmallMobile) {
        return <MobileProfile 
            user={userData} 
            setUserData={setUserData}
            isDesktop={isDesktop}
            isTablet={isTablet}
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
        />
    }
};

export default Profile;
