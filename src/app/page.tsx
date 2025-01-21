'use client';
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SideBar from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/ui/datePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 0);

  useEffect(() => {
    if (isNaN(page) || page < 0) {
      router.push("?page=0");
      return;
    }
  }, [page]);

  const renderFormPage = () => {
    switch (page) {
      case 0:
        return (
          <>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-semibold text-white mb-2">
                Name
              </label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="noHp" className="text-sm font-semibold text-white mb-2">
                No HP
              </label>
              <Input
                type="text"
                id="noHp"
                placeholder="Enter your no hp"
                className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="tempatLahir" className="text-sm font-semibold text-white mb-2">
                Tempat Lahir
              </label>
              <Input
                type="text"
                id="tempatLahir"
                placeholder="Enter your tempat lahir"
                className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="tanggalLahir" className="text-sm font-semibold text-white mb-2">
                Tanggal Lahir
              </label>
              <DatePickerDemo />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="tanggalLahir" className="text-sm font-semibold text-white mb-2">
                Jenis Kelamin
              </label>
              <Select>
                <SelectTrigger className="w-full text-white caret-white border-[#1b1d2e] border-2 active:border-[#4b5fe2]">
                  <SelectValue placeholder="jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Laki Laki</SelectItem>
                  <SelectItem value="dark">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="flex flex-col mt-2">
              <label htmlFor="npm" className="text-sm font-semibold text-white mb-2">
                NPM
              </label>
              <Input
                type="text"
                id="npm"
                placeholder="Enter your npm"
                className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="kelas" className="text-sm font-semibold text-white mb-2">
                Kelas
              </label>
              <Input
                type="text"
                id="kelas"
                placeholder="Enter your kelas"
                className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="lokasiKampus" className="text-sm font-semibold text-white mb-2">
                Lokasi Kampus
              </label>
              <Input
                type="text"
                id="lokasiKampus"
                placeholder="Enter your lokasi kampus"
                className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="flex flex-col mt-2">
              <label htmlFor="tempatLahir" className="text-sm font-semibold text-white mb-2">
                Tempat Lahir
              </label>
              <Input
                type="text"
                id="tempatLahir"
                placeholder="Enter your tempat lahir"
                className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="tanggalLahir" className="text-sm font-semibold text-white mb-2">
                Tanggal Lahir
              </label>
              <DatePickerDemo />
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-semibold text-white mb-2">
                Name
              </label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="noHp" className="text-sm font-semibold text-white mb-2">
                No HP
              </label>
              <Input
                type="text"
                id="noHp"
                placeholder="Enter your no hp"
                className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="tempatLahir" className="text-sm font-semibold text-white mb-2">
                Tempat Lahir
              </label>
              <Input
                type="text"
                id="tempatLahir"
                placeholder="Enter your tempat lahir"
                className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="tanggalLahir" className="text-sm font-semibold text-white mb-2">
                Tanggal Lahir
              </label>
              <DatePickerDemo />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="tanggalLahir" className="text-sm font-semibold text-white mb-2">
                Jenis Kelamin
              </label>
              <Select>
                <SelectTrigger className="w-full text-white caret-white border-[#1b1d2e] border-2 active:border-[#4b5fe2]">
                  <SelectValue placeholder="jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Laki Laki</SelectItem>
                  <SelectItem value="dark">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex bg-[#0b0d14]">
      <SideBar />
      <main className="flex-1 ml-20 sm:ml-40 lg:ml-72 p-8 h-screen bg-[#0b0d14] flex items-center justify-center">
        <div className="bg-[#12141e] md:w-[75%] lg:w-[60%] w-[85%] mx-auto p-5 rounded-md border-[#1f2236] border-2 flex flex-col">
          <form>{renderFormPage()}</form>
          <Pagination className="mt-3">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  href={`?page=${Math.max(0, page - 1)}`}
                  className="bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[5rem]"
                >
                  Previous
                </PaginationLink>
              </PaginationItem>
              {[0, 1, 2].map((pg) => (
                <PaginationItem key={pg}>
                  <PaginationLink
                    href={`?page=${pg}`}
                    className={`${pg === page ? "bg-gray-600 hover:bg-gray-700" : "bg-[#4b5fe2] hover:bg-[#4b5fe2]"
                      } text-white hover:text-white bg-[#4b5fe2] hover:bg-[#4b5fe2]`}
                  >
                    {pg + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationLink
                  href={`?page=${Math.min(2, page + 1)}`}
                  className="bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[5rem]"
                >
                  Next
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  );
};

export default Home;
