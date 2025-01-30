import SideBar from "@/components/sidebar";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdOutlineFileUpload } from "react-icons/md";
import { Toaster } from "@/components/ui/toaster"
import React from "react";
import AvatarProfile from '@/../public/avatar.jpg';

interface Props {
    isOpen: boolean;
    fileName: string;
    preview: string | null;
    isDragging: boolean;
    openModal: () => void;
    closeModal: () => void;
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragLeave: () => void;
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleFileChange: (file: File | null) => void;
    isTablet: boolean;
}

const TabletDesktopProfile: React.FC<Props> = ({ isTablet, isOpen, preview, openModal, handleFileChange, closeModal, handleDragOver, handleDrop, handleDragLeave, fileName, isDragging }) => {
    return (
        <>
            <div className="flex bg-[#0b0d14]">
                <SideBar category="user" />
                <main className="flex-1 ml-20 sm:ml-40 lg:ml-72 p-8 h-screen bg-[#0b0d14] flex items-center justify-center">
                    <div className="bg-[#12141e] md:w-[75%] lg:w-[60%] w-[85%] mx-auto p-5 rounded-md border-[#1f2236] border-2 flex flex-col">
                        {isOpen && (
                            <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-[#12141e] w-[90%] max-w-md rounded-lg shadow-lg relative">
                                    <div className="p-4 border-[#1f2236] relative">
                                        <h2 className="text-xl font-semibold text-white">Upload Avatar</h2>
                                        <button
                                            onClick={closeModal}
                                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                        >
                                            <ImCross />
                                        </button>
                                    </div>

                                    <div
                                        className={`p-4 border-2 rounded-sm transition-colors ${isDragging ? "border-[#4b5fe2] bg-[#1f2236]" : "border-[#1f2236]"}`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <div className="flex justify-center">
                                            <Image
                                                src={preview || AvatarProfile.src}
                                                className="rounded-full object-cover w-[100px] h-[100px]"
                                                alt="User Icon"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                        <div className="flex flex-row justify-center mt-3">
                                            <div className={`border-t-2 rounded-s-sm w-[18rem] border-s-2 border-b-2 border-e-2 ${isDragging ? 'border-[#4b5fe2]' : 'border-[#1f2236]'} px-3 py-1 overflow-hidden whitespace-nowrap text-ellipsis`}>
                                                <p className="text-white text-md text-center">{fileName}</p>
                                            </div>
                                            <div className={`border-t-2 border-b-2 border-e-2 rounded-e-sm ${isDragging ? 'border-[#4b5fe2]' : 'border-[#1f2236]'} px-3 py-1 flex items-center`}>
                                                <label
                                                    htmlFor="file-upload"
                                                    className="cursor-pointer flex items-center"
                                                >
                                                    <MdOutlineFileUpload className="text-white" size={25} />
                                                </label>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 border-[#1f2236] flex justify-end space-x-2">
                                        <button
                                            onClick={closeModal}
                                            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                        >
                                            Close
                                        </button>
                                        <button className="bg-[#4b5fe2] hover:bg-[#4558cf] text-white px-4 py-2 rounded-md">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <p className="text-lg mb-3 text-white">Profile Picture</p>
                        <Image
                            src={preview || AvatarProfile.src}
                            className="rounded-full object-cover w-[100px] h-[100px]"
                            alt="User Icon"
                            width={100}
                            height={100}
                        />
                        <Button className={`bg-[#4b5fe2] hover:bg-[#4558cf] mt-5 ${isTablet ? 'w-[8rem] text-[13px]' : 'text-sm w-[9rem]'}`} onClick={openModal}>
                            Upload Avatar
                        </Button>
                        <form action="" className="mt-5">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="email" className="text-white mb-1 text-sm">Email</label>
                                <Input
                                    placeholder="email"
                                    className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
                                    name="email"
                                    type="email"
                                />
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="username" className="text-white mb-1 text-sm">Username</label>
                                <Input
                                    placeholder="username"
                                    className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
                                    name="username"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="password" className="text-white mb-1 text-sm">Password</label>
                                <Input
                                    placeholder="password"
                                    className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
                                    name="password"
                                    type="password"
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button className={`bg-[#4b5fe2] hover:bg-[#4558cf] ${isTablet ? 'w-[8rem] text-[13px]' : 'text-sm w-[9rem]'}`}>Save Changes</Button>
                            </div>
                        </form>
                    </div>
                    <Toaster />
                </main>
            </div>
        </>
    )
}

export default TabletDesktopProfile