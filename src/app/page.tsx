import React from "react";
import SideBar from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/ui/datePicker";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const Home = () => {
  return (
    <>
      <div className="flex bg-[#0b0d14]">
        <SideBar />
        <main className="flex-1 ml-20 sm:ml-40 lg:ml-72 p-8 h-screen bg-[#0b0d14] flex items-center justify-center">
          <div className="bg-[#12141e] md:w-[75%] lg:w-[60%] w-[85%] mx-auto p-5 rounded-md border-[#1f2236] border-2 flex flex-col">
            <form action="">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-semibold text-white mb-2">
                  Name
                </label>
                <Input type="text" id="name" placeholder="Enter your name" className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="npm" className="text-sm font-semibold text-white mb-2">
                  NPM
                </label>
                <Input type="text" id="npm" placeholder="Enter your npm" className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="kelas" className="text-sm font-semibold text-white mb-2">
                  Kelas
                </label>
                <Input type="text" id="kelas" placeholder="Enter your kelas" className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="lokasiKampus" className="text-sm font-semibold text-white mb-2">
                  Lokasi Kampus
                </label>
                <Input type="text" id="lokasiKampus" placeholder="Enter your lokasi kampus" className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="tempatLahir" className="text-sm font-semibold text-white mb-2">
                  Tempat Lahir
                </label>
                <Input type="text" id="tempatLahir" placeholder="Enter your tempat lahir" className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="tanggalLahir" className="text-sm font-semibold text-white mb-2">
                  Tanggal Lahir
                </label>
                <DatePickerDemo />
              </div>
            </form>
            <br />
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="bg-[#4b5fe2] border-2 border-[#1b1d2e] text-white hover:bg-[#4b5fe2] hover:text-white" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="bg-[#4b5fe2] border-2 border-[#1b1d2e] text-white hover:bg-[#4b5fe2] hover:text-white">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive className="bg-[#4b5fe2] border-2 border-[#1b1d2e] text-white hover:bg-[#4b5fe2] hover:text-white">
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="bg-[#4b5fe2] border-2 border-[#1b1d2e] text-white hover:bg-[#4b5fe2] hover:text-white">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis className="bg-[#4b5fe2] border-2 border-[#1b1d2e] text-white hover:bg-[#4b5fe2] hover:text-white rounded-md" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="bg-[#4b5fe2] border-2 border-[#1b1d2e] text-white hover:bg-[#4b5fe2] hover:text-white" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </main>
      </div>
    </>
  )
};

export default Home;