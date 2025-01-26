'use client';
import { useMediaQuery } from "react-responsive";
import React, { useEffect, useState } from "react";
import MobileTabletDesktopDashboardUser from "@/layout/dashboard/user/mobileTabletDesktop";
import MobileDashboardUser from "@/layout/dashboard/user/mobile";

const DashboardUser = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isMobile = useMediaQuery({
        query: '(max-width: 640px) and (min-width: 440px)'
    });

    const isUltraMobile = useMediaQuery({
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

    if (isUltraMobile) {
        return <MobileDashboardUser />
    }
};

export default DashboardUser;
