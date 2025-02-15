'use client';
import React, { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
    const file = event.target.files?.[0] || null;
    formik.setFieldValue(fieldName, file);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-[#12141e] w-[50%] p-8 border-2 border-[#1f2236] rounded-md">
        <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
          Form Pendaftaran
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {page === 1 && (
            ["nama", "email", "tempat_tanggal_lahir", "jenis_kelamin", "alamat", "no_hp"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-white capitalize">{field.replace('_', ' ')}</label>
                <Input type="text" value={formik.values[field as keyof FormData] as string} onChange={formik.handleChange} name={field} />
              </div>
            ))
          )}
          {page === 2 && (
            ["npm", "kelas", "jurusan", "lokasi_kampus", "posisi", "ipk"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-white capitalize">{field.replace('_', ' ')}</label>
                <Input type="text" value={formik.values[field as keyof FormData] as string} onChange={formik.handleChange} name={field} />
              </div>
            ))
          )}
          {page === 3 && (
            ["cv", "ktm", "krs", "pas_foto", "ktp", "rangkuman_nilai", "certificate"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-white capitalize">{field.replace('_', ' ')}</label>
                <Input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={(e) => handleFileChange(e, field as keyof FormData)} />
              </div>
            ))
          )}
          <div className="flex justify-between mt-4">
            {page > 1 && <Button type="button" onClick={() => setPage(page - 1)}>Previous</Button>}
            {page < 3 ? (
              <Button type="button" onClick={() => setPage(page + 1)}>Next</Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;