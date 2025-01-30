"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineFileUpload } from "react-icons/md";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import MobileTabletDesktopHome from "@/responsive/home/mobileTabletDesktop";
import MobileHome from "@/responsive/home/mobile";

interface UseFileUploadReturn {
  fileName: string;
  isDragging: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLLabelElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
  handleDragLeave: () => void;
}


interface InputFileProps {
  placeholder: string;
}

const useFileUpload = (placeholder: string): UseFileUploadReturn => {
  const [fileName, setFileName] = useState(placeholder);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return {
    fileName,
    isDragging,
    handleFileChange,
    handleDragOver,
    handleDrop,
    handleDragLeave,
  };
};

export const InputFile: React.FC<InputFileProps> = ({ placeholder }) => {
  const {
    fileName,
    isDragging,
    handleFileChange,
    handleDragOver,
    handleDrop,
    handleDragLeave,
  } = useFileUpload(placeholder);

  return (
    <div className="flex flex-row">
      <div className="border-[#1b1d2e] border-t-2 border-s-2 w-[9rem] rounded-s-md border-b-2 focus:border-[#4b5fe2] h-9 text-[#71717a] flex items-center overflow-hidden whitespace-nowrap">
        <p className="ms-3 text-ellipsis overflow-hidden">{fileName}</p>
      </div>
      <label
        className={`border-[#1b1d2e] border-s-2 border-e-2 border-t-2 border-b-2 rounded-e-md w-[3rem] focus:border-[#4b5fe2] flex items-center justify-center cursor-pointer ${isDragging ? "bg-[#4b5fe2]" : ""
          }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <MdOutlineFileUpload className="text-white" size={25} />
        <input
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};


const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 0);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isMobile = useMediaQuery({
    query: '(max-width: 640px) and (min-width: 438px)'
  });

  const isSmallMobile = useMediaQuery({
    query: '(max-width: 438px)'
  });

  const isTablet = useMediaQuery({
    query: '(min-width: 640px) and (max-width: 1024px)'
  });

  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)'
  });

  useEffect(() => {
    if (isNaN(page) || page < 0) {
      router.push("?page=0");
    }
  }, [page]);

  if (!isClient) {
    return null;
  }

  if (isDesktop || isTablet || isMobile) {
    return (
      <MobileTabletDesktopHome page={page} isMobile={isMobile} />
    );
  }

  if (isSmallMobile) {
    return (
      <MobileHome />
    );
  }
};

export default Home;
