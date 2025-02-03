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

    const [isOpen, setIsOpen] = useState(false);
    const [fileName, setFileName] = useState("File Name");
    const [preview, setPreview] = useState<string | null>(data?.data?.data.avatar);
    const [isDragging, setIsDragging] = useState(false);
    const [userData, setUserData] = useState(data?.data?.data);
    const { toast } = useToast()
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

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setFileName("File Name");
        setPreview(userData?.avatar); 
        setIsOpen(false);
    };

    const handleFileChange = (file: File | null) => {
        if (file && file.type.startsWith('image/')) {
            setFileName(file.name);

            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            if (file) {
                toast({
                    title: "Failed to upload",
                    description: "Only image files are allowed",
                    variant: "destructive"
                })
            }
            setFileName("File Name");
            setPreview(userData?.avatar); 
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileChange(file);
        } else {
            toast({
                title: "Failed to upload",
                description: "Only image files are allowed",
                variant: "destructive"
            })
        }
    };

    if (!isClient) {
        return null;
    }

    if (isDesktop || isTablet) {
        return <TabletDesktopProfile 
            user={userData} 
            setUserData={setUserData}
            preview={preview}
            isTablet={isTablet}
            isOpen={isOpen} 
            isDragging={isDragging} 
            openModal={openModal} 
            handleFileChange={handleFileChange} 
            closeModal={closeModal} 
            handleDragOver={handleDragOver} 
            handleDrop={handleDrop} 
            handleDragLeave={handleDragLeave} 
            fileName={fileName} 
        />
    }

    if (isMobile || isSmallMobile) {
        return <MobileProfile 
            isMobile={isMobile} 
            isSmallMobile={isSmallMobile} 
            isOpen={isOpen} 
            preview={preview} 
            isDragging={isDragging} 
            openModal={openModal} 
            handleFileChange={handleFileChange} 
            closeModal={closeModal} 
            handleDragOver={handleDragOver} 
            handleDrop={handleDrop} 
            handleDragLeave={handleDragLeave} 
            fileName={fileName} 
        />
    }
};

export default Profile;
