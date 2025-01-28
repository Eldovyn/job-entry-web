'use client';
import React, { useState, useEffect } from "react";
import TabletDesktopProfile from "@/layout/profile/tabletDesktop";
import MobileProfile from "@/layout/profile/mobile";
import Avatar from "../../../public/avatar.jpg";
import { useToast } from "@/hooks/use-toast"
import { useMediaQuery } from 'react-responsive';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [fileName, setFileName] = useState("File Name");
    const [preview, setPreview] = useState<string | null>(Avatar.src);
    const [isDragging, setIsDragging] = useState(false);
    const { toast } = useToast()
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isDesktop = useMediaQuery({ minWidth: 769 });
    const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 769 });
    const isMobile = useMediaQuery({ maxWidth: 426, minWidth: 320 });
    const isUltraMobile = useMediaQuery({ maxWidth: 320 });

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setFileName("File Name");
        setPreview(Avatar.src);
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
            setPreview(Avatar.src);
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
        return <TabletDesktopProfile isTablet={isTablet} isOpen={isOpen} preview={preview} isDragging={isDragging} openModal={openModal} handleFileChange={handleFileChange} closeModal={closeModal} handleDragOver={handleDragOver} handleDrop={handleDrop} handleDragLeave={handleDragLeave} fileName={fileName} />
    }

    if (isMobile || isUltraMobile) {
        return <MobileProfile isMobile={isMobile} isUltraMobile={isUltraMobile} isOpen={isOpen} preview={preview} isDragging={isDragging} openModal={openModal} handleFileChange={handleFileChange} closeModal={closeModal} handleDragOver={handleDragOver} handleDrop={handleDrop} handleDragLeave={handleDragLeave} fileName={fileName} />
    }
};

export default Profile;
