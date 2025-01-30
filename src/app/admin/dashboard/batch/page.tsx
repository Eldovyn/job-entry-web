'use client';
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MobileBatch from "@/responsive/dashboard/batch/mobile";
import TabletDesktopBatch from "@/responsive/dashboard/batch/tabletDesktop";


interface DataBatch {
    title: string;
    duration: string;
    idBatch: string;
}

const BatchPage = () => {
    const dataBatch: DataBatch[] = [
        {
            title: "form pendaftaran batch 2023",
            duration: "7d ago",
            idBatch: "1"
        },
        {
            title: "form pendaftaran batch 2024",
            duration: "7d ago",
            idBatch: "2"
        },
        {
            title: "form pendaftaran batch 2025",
            duration: "7d ago",
            idBatch: "3"
        },
    ];

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

    if (isDesktop || isTablet) {
        return <TabletDesktopBatch dataBatch={dataBatch} isDesktop={isDesktop} />
    }

    if (isMobile) {
        return <MobileBatch dataBatch={dataBatch} />
    }
}

export default BatchPage