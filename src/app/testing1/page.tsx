'use client';
import React, { useState } from 'react';

const FileInput = () => {
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setFileName(file.name);
                setSelectedFile(file);

                // Membaca file gambar dan menghasilkan preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                // Reset jika file bukan gambar
                alert('Only image files are accepted.');
                setFileName('');
                setSelectedFile(null);
                setImagePreview(null);
            }
        }
    };

    const handleRemoveImage = () => {
        setFileName('');
        setSelectedFile(null);
        setImagePreview(null);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
            <label className="text-gray-700 font-medium mb-2">Upload Image</label>
            <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
                accept="image/*"  // Menentukan hanya gambar yang dapat dipilih
            />
            <label
                htmlFor="file-input"
                className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Choose File
            </label>

            {fileName && (
                <p className="mt-2 text-gray-600">
                    File Selected: <span className="font-semibold">{fileName}</span>
                </p>
            )}

            {imagePreview && (
                <div className="mt-4 relative">
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    <button
                        onClick={handleRemoveImage}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileInput;
