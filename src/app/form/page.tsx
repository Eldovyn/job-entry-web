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
import { useGetForm } from "@/api/form/useGetForm";
import { useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import LoadingSpinnerComponent from 'react-spinners-components';
import { useRouter } from "next/navigation";

interface ErrorResponse {
  message: string;
  errors?: {
    [field: string]: string[];
  };
}

interface FormErrors {
  nama: string[];
  tempat_tanggal_lahir: string[];
  jenis_kelamin: string[];
  alamat: string[];
  no_hp: string[];
  email: string[];
  ipk: string[];
  npm: string[];
  kelas: string[];
  jurusan: string[];
  lokasi_kampus: string[];
  posisi: string[];
  cv: string[];
  ktm: string[];
  krs: string[];
  pas_foto: string[];
  ktp: string[];
  rangkuman_nilai: string[];
  certificate: string[];
}

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
  const [isManualSubmit, setIsManualSubmit] = useState(false);

  const searchParams = useSearchParams();

  const { push } = useRouter();

  const [formErrors, setFormErrors] = useState<FormErrors>({
    nama: [],
    tempat_tanggal_lahir: [],
    jenis_kelamin: [],
    alamat: [],
    no_hp: [],
    email: [],
    ipk: [],
    npm: [],
    kelas: [],
    jurusan: [],
    lokasi_kampus: [],
    posisi: [],
    cv: [],
    ktm: [],
    krs: [],
    pas_foto: [],
    ktp: [],
    rangkuman_nilai: [],
    certificate: [],
  });

  const handleValidation = (errors: {
    nama: [],
    tempat_tanggal_lahir: [],
    jenis_kelamin: [],
    alamat: [],
    no_hp: [],
    email: [],
    ipk: [],
    npm: [],
    kelas: [],
    jurusan: [],
    lokasi_kampus: [],
    posisi: [],
    cv: [],
    ktm: [],
    krs: [],
    pas_foto: [],
    ktp: [],
    rangkuman_nilai: [],
    certificate: [],
  }) => {
    setFormErrors({
      nama: errors.nama || [],
      tempat_tanggal_lahir: errors.tempat_tanggal_lahir || [],
      jenis_kelamin: errors.jenis_kelamin || [],
      alamat: errors.alamat || [],
      no_hp: errors.no_hp || [],
      email: errors.email || [],
      ipk: errors.ipk || [],
      npm: errors.npm || [],
      kelas: errors.kelas || [],
      jurusan: errors.jurusan || [],
      lokasi_kampus: errors.lokasi_kampus || [],
      posisi: errors.posisi || [],
      cv: errors.cv || [],
      ktm: errors.ktm || [],
      krs: errors.krs || [],
      pas_foto: errors.pas_foto || [],
      ktp: errors.ktp || [],
      rangkuman_nilai: errors.rangkuman_nilai || [],
      certificate: errors.certificate || [],
    });
  };

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => {
      console.log('Data:', data);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });
      const response = await axiosInstance.post('/job-entry/form', formData, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('accessToken') || ''}`,
        },
        params: {
          batch_id: searchParams.get('q') || '',
        },
      });
      return response;
    },
    onError: (error) => {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.status === 400 && err.response.data.errors) {
        handleValidation({
          nama: err.response?.data?.errors?.nama as [],
          tempat_tanggal_lahir: err.response?.data?.errors?.tempat_tanggal_lahir as [],
          jenis_kelamin: err.response?.data?.errors?.jenis_kelamin as [],
          alamat: err.response?.data?.errors?.alamat as [],
          no_hp: err.response?.data?.errors?.no_hp as [],
          email: err.response?.data?.errors?.email as [],
          ipk: err.response?.data?.errors?.ipk as [],
          npm: err.response?.data?.errors?.npm as [],
          kelas: err.response?.data?.errors?.kelas as [],
          jurusan: err.response?.data?.errors?.jurusan as [],
          lokasi_kampus: err.response?.data?.errors?.lokasi_kampus as [],
          posisi: err.response?.data?.errors?.posisi as [],
          cv: err.response?.data?.errors?.cv as [],
          ktm: err.response?.data?.errors?.ktm as [],
          krs: err.response?.data?.errors?.krs as [],
          pas_foto: err.response?.data?.errors?.pas_foto as [],
          ktp: err.response?.data?.errors?.ktp as [],
          rangkuman_nilai: err.response?.data?.errors?.rangkuman_nilai as [],
          certificate: err.response?.data?.errors?.certificate as [],
        })
        return
      }
    },
    onSuccess: async (data) => {
      const dataApi = data.data;
      push(`/form/is-submitted?token=${dataApi.data.token}`);
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
    onSubmit: (values, { setSubmitting }) => {
      try {
        if (!isManualSubmit) return;
        mutate(values);
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles: File[], fieldName: keyof FormData) => {
    const file = acceptedFiles[0] || null;
    formik.setFieldValue(fieldName, file);
    setSelectedFiles((prev) => ({ ...prev, [fieldName]: file ? file.name : 'No file selected' }));
  }, [formik]);

  const { data: dataForm, isLoading: dataFormIsLoading, isError: dataFormIsError, error: dataFormError } = useGetForm(searchParams.get('q') || '', Cookies.get('accessToken') || '');

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={`bg-[#12141e] w-[50%] p-8 border-2 border-[#1f2236] rounded-md ${page === 3 ? 'mt-10 mb-10' : ''} ${page === 1 ? 'mt-10 mb-10' : ''} ${page === 2 ? 'mt-10 mb-10' : ''}`}>
        <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
          {dataForm?.data[0]?.title}
        </p>
        <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit} className="space-y-4 pt-3">
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
              <Button type="submit" onClick={() => setIsManualSubmit(true)} className="bg-[#4b5fe2] w-[6rem] hover:bg-[#4b5fe2]">
                {formik.isSubmitting ? (
                  <div className="flex flex-row text-white items-center cursor-pointer">
                    <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'100px'} />
                    <p className="ms-1">Submit</p>
                  </div>
                ) : "Submit"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )

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