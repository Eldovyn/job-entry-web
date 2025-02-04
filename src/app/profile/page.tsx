'use client';
import React, { useState, useEffect } from "react";
import TabletDesktopProfile from "@/responsive/profile/tabletDesktop";
import MobileProfile from "@/responsive/profile/mobile";
import { useToast } from "@/hooks/use-toast"
import { useMediaQuery } from 'react-responsive';
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";

const Profile = () => {
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

    const [userData, setUserData] = useState(data?.data?.data);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (data?.data?.data) {
            setUserData(data.data.data);
        }
    }, [data]);

    const isDesktop = useMediaQuery({ minWidth: 769 });
    const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 769 });
    const isMobile = useMediaQuery({ maxWidth: 426, minWidth: 320 });
    const isSmallMobile = useMediaQuery({ maxWidth: 320 });

    if (!isClient) {
        return null;
    }

    if (isDesktop || isTablet) {
        return <TabletDesktopProfile 
            user={userData} 
            setUserData={setUserData}
            isDesktop={isDesktop}
            isTablet={isTablet}
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
        />
    }

    if (isMobile || isSmallMobile) {
        return <MobileProfile 
            user={userData} 
            setUserData={setUserData}
            isDesktop={isDesktop}
            isTablet={isTablet}
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
        />
    }
};

export default Profile;
