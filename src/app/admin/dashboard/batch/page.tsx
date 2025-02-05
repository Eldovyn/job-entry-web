'use client';
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MobileBatch from "@/responsive/dashboard/batch/mobile";
import TabletDesktopBatch from "@/responsive/dashboard/batch/tabletDesktop";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";

interface DataBatch {
    batch_id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    author: string;
    is_active: boolean;
}


const BatchPage = () => {
    const [isClient, setIsClient] = useState(false);
    const [dataBatch, setDataBatch] = useState<DataBatch[] | []>([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const query = searchParams.get('q') || '';

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['get-all-batch', query],
        queryFn: async () => {
            const response = await axiosInstance.get(`/job-entry/admin/search/batch`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('accessToken') || ''}`
                },
                params: { q: query }
            });
            return response.data;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    useEffect(() => {
        setDataBatch(data?.page.batches[0]);
    }, [data]);

    useEffect(() => {
        if (!query) {
            router.push('/admin/dashboard/batch')
        }
    }, []);

    const isDesktop = useMediaQuery({ minWidth: 853 });
    const isTablet = useMediaQuery({ minWidth: 445, maxWidth: 853 });
    const isMobile = useMediaQuery({ maxWidth: 445 });

    if (!isClient) {
        return null;
    }

    if (isDesktop || isTablet) {
        return <TabletDesktopBatch dataBatch={dataBatch} setDataBatch={setDataBatch} user={data?.user} isDesktop={isDesktop} />
    }

    if (isMobile) {
        return <MobileBatch dataBatch={dataBatch} />
    }
}

export default BatchPage;