"use client";
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
    }
  }, [page]);

  const formFields = [
    [
      { id: "name", label: "Name", placeholder: "Enter your name" },
      { id: "noHp", label: "No HP", placeholder: "Enter your no hp" },
      { id: "tempatLahir", label: "Tempat Lahir", placeholder: "Enter your tempat lahir" },
      { id: "tanggalLahir", label: "Tanggal Lahir", component: <DatePickerDemo /> },
      {
        id: "jenisKelamin",
        label: "Jenis Kelamin",
        component: (
          <Select>
            <SelectTrigger className="w-full text-white caret-white border-[#1b1d2e] border-2 active:border-[#4b5fe2]">
              <SelectValue placeholder="jenis kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Laki Laki</SelectItem>
              <SelectItem value="female">Perempuan</SelectItem>
            </SelectContent>
          </Select>
        ),
      },
    ],
    [
      { id: "npm", label: "NPM", placeholder: "Enter your npm" },
      { id: "kelas", label: "Kelas", placeholder: "Enter your kelas" },
      { id: "lokasiKampus", label: "Lokasi Kampus", placeholder: "Enter your lokasi kampus" },
    ],
    [
      { id: "tempatLahir", label: "Tempat Lahir", placeholder: "Enter your tempat lahir" },
      { id: "tanggalLahir", label: "Tanggal Lahir", component: <DatePickerDemo /> },
    ],
  ];

  const renderFormPage = () => {
    return formFields[page]?.map((field) => (
      <div className="flex flex-col mt-2" key={field.id}>
        <label htmlFor={field.id} className="text-sm font-semibold text-white mb-2">
          {field.label}
        </label>
        {field.component || (
          <Input
            type="text"
            id={field.id}
            placeholder={field.placeholder}
            className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
          />
        )}
      </div>
    ));
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
                    className={`${pg === page ? "bg-gray-600 hover:bg-gray-700" : "bg-[#4b5fe2] hover:bg-[#4b5fe2]"} text-white hover:text-white`}
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