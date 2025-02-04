'use client';
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MobileBatch from "@/responsive/dashboard/batch/mobile";
import TabletDesktopBatch from "@/responsive/dashboard/batch/tabletDesktop";
import { useQueries } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";


const BatchPage = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    const queries = useQueries({
        queries: [
            {
                queryKey: ['get-all-batch'],
                queryFn: async () => {
                    const response = await axiosInstance.get(`/job-entry/admin/batch`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${Cookies.get('accessToken') || ''}`
                        }
                    });
                    return response.data;
                },
                refetchOnWindowFocus: false,
                retry: false,
            },
            {
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
            }
        ]
    });

    console.log(queries[0]?.data?.data);

    const isDesktop = useMediaQuery({ minWidth: 853 });
    const isTablet = useMediaQuery({ minWidth: 445, maxWidth: 853 });
    const isMobile = useMediaQuery({ maxWidth: 445 });

    if (!isClient) {
        return null;
    }

    if (isDesktop || isTablet) {
        return <TabletDesktopBatch dataBatch={queries[0]?.data?.data} user={queries[1]?.data?.data.data} isDesktop={isDesktop} />
    }

    if (isMobile) {
        return <MobileBatch dataBatch={queries[0]?.data?.data} />
    }
}

export default BatchPage