'use client'
import { useMediaQuery } from "react-responsive"
import React, { useState, useEffect } from "react";
import TabletDesktopAddBatch from "@/responsive/dashboard/add-batch/tabletDesktop";
import MobileAddBatch from "@/responsive/dashboard/add-batch/mobile";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";

const AddBatch = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsClient(true);
        }, 100);
    }, []);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['@me'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/job-entry/@me`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('accessToken') || ''}`
                }
            });
            return response;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    const isDesktop = useMediaQuery({ minWidth: 853 });
    const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 853 });
    const isMobile = useMediaQuery({ maxWidth: 426 });

    if (!isClient) {
        return null;
    }

    if (isDesktop || isTablet) {
        return <TabletDesktopAddBatch user={data?.data?.data} isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} />
    }

    if (isMobile) {
        return <MobileAddBatch isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} />
    }
}

export default AddBatch