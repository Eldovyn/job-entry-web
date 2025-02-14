'use client';
import { useMediaQuery } from "react-responsive";
import React, { useEffect, useState } from "react";
import MobileTabletDesktopDashboardUser from "@/responsive/dashboard/user/mobileTabletDesktop";
import MobileDashboardUser from "@/responsive/dashboard/user/mobile";

const DashboardUser = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsClient(true);
        }, 100);
    }, []);

    const isMobile = useMediaQuery({
        query: '(max-width: 640px) and (min-width: 440px)'
    });

    const isSmallMobile = useMediaQuery({
        query: '(max-width: 440px)'
    });

    const isTablet = useMediaQuery({
        query: '(min-width: 640px) and (max-width: 1024px)'
    });

    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    });

    if (!isClient) {
        return null;
    }

    if (isDesktop || isTablet || isMobile) {
        return (
            <MobileTabletDesktopDashboardUser isMobile={isMobile} />
        );
    }

    if (isSmallMobile) {
        return <MobileDashboardUser />
    }
};

export default DashboardUser;
