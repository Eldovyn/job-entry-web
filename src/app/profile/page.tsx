import React from "react";
import SideBar from "@/components/SideBar";

const Profile = () => {
    return (
        <>
            <div className="flex">
                <SideBar />
                <main className="flex-1 ml-20 sm:ml-40 lg:ml-72 p-8">
                    <p className="text-2xl text-red-600">Profile</p>
                </main>
            </div>
        </>
    )
};

export default Profile;