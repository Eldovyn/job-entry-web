'use client'
import { useMediaQuery } from "react-responsive"
import React, { useState, useEffect } from "react";
import TabletDesktopAddBatch from "@/layout/dashboard/add-batch/tabletDesktop";
import MobileAddBatch from "@/layout/dashboard/add-batch/mobile";

const AddBatch = () => {
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
        return <TabletDesktopAddBatch />
    }

    if (isMobile) {
        return <MobileAddBatch />
    }
}

export default AddBatch