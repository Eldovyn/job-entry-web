'use client';
import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdOutlineFileUpload } from "react-icons/md";

interface FormData {
  nama: string;
  tempat_tanggal_lahir: string;
  jenis_kelamin: string;
  alamat: string;
  no_hp: string;
  email: string;
  ipk: string;
  npm: string;
  kelas: string;
  jurusan: string;
  lokasi_kampus: string;
  posisi: string;
  cv: File | null;
  ktm: File | null;
  krs: File | null;
  pas_foto: File | null;
  ktp: File | null;
  rangkuman_nilai: File | null;
  certificate: File | null;
}

const FormPage = () => {
  const [page, setPage] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<{ [key in keyof FormData]?: string }>({});

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });
      return axiosInstance.patch('/job-entry/update/files', formData, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('accessToken') || ''}`,
        },
      });
    },
  });

  const formik = useFormik<FormData>({
    initialValues: {
      nama: "",
      tempat_tanggal_lahir: "",
      jenis_kelamin: "",
      alamat: "",
      no_hp: "",
      email: "",
      ipk: "",
      npm: "",
      kelas: "",
      jurusan: "",
      lokasi_kampus: "",
      posisi: "",
      cv: null,
      ktm: null,
      krs: null,
      pas_foto: null,
      ktp: null,
      rangkuman_nilai: null,
      certificate: null,
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const onDrop = useCallback((acceptedFiles: File[], fieldName: keyof FormData) => {
    const file = acceptedFiles[0] || null;
    formik.setFieldValue(fieldName, file);
    setSelectedFiles((prev) => ({ ...prev, [fieldName]: file ? file.name : 'No file selected' }));
  }, [formik]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={`bg-[#12141e] w-[50%] p-8 border-2 border-[#1f2236] rounded-md ${page === 3 ? 'mt-10 mb-10' : ''} ${page === 1 ? 'mt-10 mb-10' : ''} ${page === 2 ? 'mt-10 mb-10' : ''}`}>
        <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
          Form Pendaftaran
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-4 pt-3">
        {page === 1 && (
            ["nama", "email", "tempat_tanggal_lahir", "jenis_kelamin", "alamat", "no_hp"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-1">{field.replace('_', ' ')}</label>
                <Input type="text" className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" value={formik.values[field as keyof FormData] as string} onChange={formik.handleChange} name={field} />
              </div>
            ))
          )}
          {page === 2 && (
            ["npm", "kelas", "jurusan", "lokasi_kampus", "posisi", "ipk"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-1">{field.replace('_', ' ')}</label>
                <Input type="text" className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]" value={formik.values[field as keyof FormData] as string} onChange={formik.handleChange} name={field} />
              </div>
            ))
          )}
          {page === 3 && (
            ["cv", "ktm", "krs", "pas_foto", "ktp", "rangkuman_nilai", "certificate"].map((field) => (
              <div key={field} className="flex flex-col text-white">
                <label className="text-sm font-semibold text-white mb-1">{field.replace('_', ' ')}</label>
                <div className="flex flex-row justify-center items-center">
                  <p className="ps-3 text-ellipsis overflow-hidden text-gray-400 w-full border-[#1b1d2e] border-t-2 border-b-2 py-1 border-s-2 rounded-s-md">
                    {selectedFiles[field as keyof FormData] || 'No file selected'}
                  </p>
                  <Dropzone field={field as keyof FormData} onDrop={onDrop} />
                </div>
              </div>
            ))
          )}
          <div className="flex justify-between mt-4">
            {page > 1 && <Button type="button" className="bg-[#4b5fe2] w-[6rem] hover:bg-[#4b5fe2]" onClick={() => setPage(page - 1)}>Previous</Button>}
            {page < 3 ? (
              <Button type="button" className="bg-[#4b5fe2] w-[6rem] hover:bg-[#4b5fe2]" onClick={() => setPage(page + 1)}>Next</Button>
            ) : (
              <Button type="submit" className="bg-[#4b5fe2] w-[6rem] hover:bg-[#4b5fe2]">Submit</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );

  function Dropzone({ field, onDrop }: { field: keyof FormData; onDrop: (acceptedFiles: File[], fieldName: keyof FormData) => void; }) {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, field),
      accept: { 'application/pdf': [] },
      noClick: true,
    });

    return (
      <label {...getRootProps()} className="border-[#1b1d2e] border-s-2 border-e-2 py-1 border-t-2 border-b-2 rounded-e-md w-[3rem] flex items-center justify-center cursor-pointer">
        <input {...getInputProps()} className="hidden" />
        <MdOutlineFileUpload className="text-white" size={25} />
      </label>
    );
  }
};

export default FormPage;