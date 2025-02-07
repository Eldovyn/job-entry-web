'use client';
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MobileBatch from "@/responsive/dashboard/batch/mobile";
import TabletDesktopBatch from "@/responsive/dashboard/batch/tabletDesktop";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";

interface Pagination {
    current_page: number;
    items_per_page: number;
    limit: number | null;
    next_page: number | null;
    previous_page: number | null;
    total_items: number;
    total_pages: number;
    current_batch: Batch[];
}

interface User {
    avatar: string;
    created_at: number;
    email: string;
    is_active: boolean;
    is_admin: boolean;
    updated_at: number;
    user_id: string;
    username: string;
}

interface Batch {
    batch_id: string;
    created_at: number;
    description: string;
    title: string;
    updated_at: number;
    user_id: string;
    author: string
    is_active: boolean
}

interface SuccessResponse {
    data: Batch[];
    message: string;
    page: Pagination;
    user: User;
}

interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
}


const BatchPage = () => {
    const [isClient, setIsClient] = useState(false);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get("current_page"));
    const q = searchParams.get("q");

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { data, isLoading, isError, error } = useQuery<SuccessResponse | ErrorResponse>({
        queryKey: ["get-all-batch", currentPage, q],
        queryFn: async () => {
            const response = await axiosInstance.get("/job-entry/admin/search/batch", {
                params: { current_page: currentPage, q: q },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('accessToken') || ''}`
                },
            });
            return response.data;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    useEffect(() => {
        if (!isLoading && data) {
            setPagination((data as SuccessResponse).page);
        }
    }, [isLoading, data]);

    const isDesktop = useMediaQuery({ minWidth: 853 });
    const isTablet = useMediaQuery({ minWidth: 445, maxWidth: 853 });
    const isMobile = useMediaQuery({ maxWidth: 445 });

    if (!isClient) {
        return null;
    }

    if (isDesktop || isTablet) {
        return <TabletDesktopBatch pagination={pagination} setPagination={setPagination} data={data as SuccessResponse} isDesktop={isDesktop} />
    }

    if (isMobile) {
        return <MobileBatch data={data as SuccessResponse} />
    }
}

export default BatchPage;