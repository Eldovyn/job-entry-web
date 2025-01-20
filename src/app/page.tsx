import React from "react";
import SideBar from "@/components/sidebar";

const Home = () => {
  return (
    <>
      <div className="flex bg-[#0b0d14]">
        <SideBar />
        <main className="flex-1 ml-20 sm:ml-40 lg:ml-72 p-8 h-screen bg-[#0b0d14] flex items-center justify-center">
          <p>Dashboard</p>
        </main>
      </div>
    </>
  )
};

export default Home;