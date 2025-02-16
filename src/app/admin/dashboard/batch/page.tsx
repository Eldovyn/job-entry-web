'use client';
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MobileBatch from "@/responsive/dashboard/batch/mobile";
import TabletDesktopBatch from "@/responsive/dashboard/batch/tabletDesktop";
import Cookies from "js-cookie";
import { useMe } from "@/api/user/me";
import { useAdminAllBatch } from "@/api/batch/useAdminAllBatch";
import { useSearchParams } from "next/navigation";
import { BatchPagination } from "@/interfaces/BatchPagination";


const BatchPage = () => {
    const [isClient, setIsClient] = useState(false);
    const [pagination, setPagination] = useState<BatchPagination | null>(null);
    const searchParams = useSearchParams();
    const currentPage = searchParams.get("current_page")
    const q = searchParams.get("q");

    useEffect(() => {
        setTimeout(() => {
            setIsClient(true);
        }, 100);
    }, []);

    const { data: batch, isLoading: isLoadingBatch, isError: isErrorBatch, error: errorBatch } = useAdminAllBatch(currentPage || "1", q || "", Cookies.get('accessToken') || '');
    const { data: me, isLoading: isLoadingMe, isError: isErrorMe, error: errorMe } = useMe(Cookies.get('accessToken') || '');

    useEffect(() => {
        if (!isLoadingBatch && batch) {
            setPagination(batch.page);
        }
    }, [isLoadingBatch, batch]);

    const isDesktop = useMediaQuery({ minWidth: 853 });
    const isTablet = useMediaQuery({ minWidth: 455, maxWidth: 853 });
    const isMobile = useMediaQuery({ maxWidth: 455 });

    if (!isClient) {
        return null;
    }

    if (isDesktop || isTablet) {
        return <TabletDesktopBatch category="admin" pagination={pagination} setPagination={setPagination} user={me?.data || null} isDesktop={isDesktop} />
    }

    if (isMobile) {
        return <MobileBatch pagination={pagination} />
    }
}

export default BatchPage;