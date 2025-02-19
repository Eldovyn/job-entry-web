'use client';
import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import TabletDesktopDashboard from "@/responsive/dashboard/data-mahasiswa/tabletDesktop";
import MobileDashboard from "@/responsive/dashboard/data-mahasiswa/mobile";
import { useGetUserAllDataMahasiswa } from "@/api/data-mahasiswa/useGetAllDataMahasiswa";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { MahasiswaPagination } from "@/interfaces/MahasiswaPagination";

const Dashboard = () => {
    const [isClient, setIsClient] = useState(false);
    const searchParams = useSearchParams();
    const [pagination, setPagination] = useState<MahasiswaPagination | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setIsClient(true);
        }, 100);
    }, []);

    const isDesktop = useMediaQuery({ minWidth: 853 });
    const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 853 });
    const isMobile = useMediaQuery({ maxWidth: 426 });

    const { data: dataMahasiswa, isLoading: isLoadingDataMahasiswa, isError: isErrorDataMahasiswa, error: errorDataMahasiswa } = useGetUserAllDataMahasiswa(searchParams.get("currentPage") || "1", searchParams.get("q") || "", Cookies.get('accessToken') || '');

    useEffect(() => {
        if (!isLoadingDataMahasiswa && dataMahasiswa) {
            setPagination(dataMahasiswa.page);
        }
    }, [isLoadingDataMahasiswa, dataMahasiswa]);

    if (!isClient) {
        return null;
    }

    if (isDesktop || isTablet) {
        return <TabletDesktopDashboard setPagination={setPagination} pagination={pagination || null} user={dataMahasiswa?.user || null} isDesktop={isDesktop} />;
    }

    if (isMobile) {
        return <MobileDashboard pagination={pagination || null} />;
    }
};

export default Dashboard;
