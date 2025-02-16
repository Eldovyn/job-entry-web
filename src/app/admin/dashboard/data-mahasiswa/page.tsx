'use client';
import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import TabletDesktopDashboard from "@/responsive/dashboard/data-mahasiswa/tabletDesktop";
import MobileDashboard from "@/responsive/dashboard/data-mahasiswa/mobile";
import { useGetUserAllDataMahasiswa } from "@/api/data-mahasiswa/useGetAllDataMahasiswa";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

const Dashboard = () => {
    const [isClient, setIsClient] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        setTimeout(() => {
            setIsClient(true);
        }, 100);
    }, []);

    const isDesktop = useMediaQuery({ minWidth: 853 });
    const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 853 });
    const isMobile = useMediaQuery({ maxWidth: 426 });

    const { data: dataMahasiswa, isLoading: isLoadingDataMahasiswa, isError: isErrorDataMahasiswa, error: errorDataMahasiswa } = useGetUserAllDataMahasiswa(searchParams.get("currentPage") || "1", searchParams.get("q") || "", Cookies.get('accessToken') || '');

    if (!isClient) {
        return null;
    }

    if (isDesktop || isTablet) {
        return <TabletDesktopDashboard pagination={dataMahasiswa?.page || null} user={dataMahasiswa?.user || null} isDesktop={isDesktop} />;
    }

    return (
        <p>Dashboard</p>
    )
};

export default Dashboard;
