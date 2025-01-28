'use client';
import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import TabletDesktopDashboard from "@/layout/dashboard/data-mahasiswa/tabletDesktop";
import MobileDashboard from "@/layout/dashboard/data-mahasiswa/mobile";

interface DataMahasiswa {
    name: string;
    noHp: string;
    tempatLahir: string;
    tanggalLahir: string;
    jenisKelamin: string;
    npm: string;
    kelas: string;
    lokasiKampus: string;
    batch: string;
}

const Dashboard = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isDesktop = useMediaQuery({ minWidth: 853 });
    const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 853 });
    const isMobile = useMediaQuery({ maxWidth: 426 });

    if (!isClient) {
        return null;
    }

    const dataMahasiswa: DataMahasiswa[] = [
        {
            name: "Andana Farras Pramudita",
            noHp: "081234567890",
            tempatLahir: "Bandung",
            tanggalLahir: "01-01-2000",
            jenisKelamin: "Laki-laki",
            npm: "20201001",
            kelas: "TI-2A",
            lokasiKampus: "Bandung",
            batch: "2022",
        },
        {
            name: "Andana Farras Pramudita",
            noHp: "081234567890",
            tempatLahir: "Bandung",
            tanggalLahir: "01-01-2000",
            jenisKelamin: "Laki-laki",
            npm: "20201002",
            kelas: "TI-2B",
            lokasiKampus: "Bandung",
            batch: "2023",
        },
        {
            name: "Andana Farras Pramudita",
            noHp: "081234567890",
            tempatLahir: "Bandung",
            tanggalLahir: "01-01-2000",
            jenisKelamin: "Laki-laki",
            npm: "20201003",
            kelas: "TI-2C",
            lokasiKampus: "Bandung",
            batch: "2024",
        }
    ];

    if (isDesktop || isTablet) {
        return <TabletDesktopDashboard dataMahasiswa={dataMahasiswa} isDesktop={isDesktop} />;
    }

    if (isMobile) {
        return <MobileDashboard dataMahasiswa={dataMahasiswa} />
    }
};

export default Dashboard;
