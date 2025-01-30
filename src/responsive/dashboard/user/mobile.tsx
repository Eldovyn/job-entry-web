interface DataMahasiswa {
    name: string;
    noHp: string;
    tempatLahir: string;
    tanggalLahir: string;
    jenisKelamin: string;
    npm: string;
    kelas: string;
    lokasiKampus: string;
}

const MobileTabletDesktopDashboardUser = () => {
    const dataMahasiswa: DataMahasiswa = {
        name: "Andana Farras Pramudita",
        noHp: "081234567890",
        tempatLahir: "Bandung",
        tanggalLahir: "01-01-2000",
        jenisKelamin: "Laki-laki",
        npm: "20201001",
        kelas: "TI-2A",
        lokasiKampus: "Bandung",
    };

    return (
        <>
            <div className="bg-[#0b0d14] min-h-screen flex items-center justify-center w-full pb-[3rem]">
                <div className={`bg-[#12141e] w-[90%] border-2 p-8 rounded-md mt-9 border-[#1f2236]`}>
                    <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">Data User</p>
                    <div className="flex flex-col mt-3 gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-semibold text-white">
                                Name
                            </label>
                            <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.name}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="noHp" className="text-sm font-semibold text-white">
                                No HP
                            </label>
                            <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.noHp}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="tempatLahir" className="text-sm font-semibold text-white">
                                Tempat Lahir
                            </label>
                            <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.tempatLahir}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="tanggalLahir" className="text-sm font-semibold text-white">
                                Tanggal Lahir
                            </label>
                            <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.tanggalLahir}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="jenisKelamin" className="text-sm font-semibold text-white">
                                Jenis Kelamin
                            </label>
                            <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.jenisKelamin}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="npm" className="text-sm font-semibold text-white">
                                NPM
                            </label>
                            <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.npm}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="kelas" className="text-sm font-semibold text-white">
                                Kelas
                            </label>
                            <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.kelas}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="lokasiKampus" className="text-sm font-semibold text-white">
                                Lokasi Kampus
                            </label>
                            <p className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md">{dataMahasiswa.lokasiKampus}</p>
                        </div>
                        <div className="flex flex-col gap-2 pb-1">
                            <label htmlFor="cv" className="text-sm font-semibold text-white">
                                CV
                            </label>
                            <button
                                onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                                className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                            >
                                {dataMahasiswa.name} - CV.pdf
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 pb-1">
                            <label htmlFor="cv" className="text-sm font-semibold text-white">
                                KRS
                            </label>
                            <button
                                onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                                className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                            >
                                {dataMahasiswa.name} - CV.pdf
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 pb-1">
                            <label htmlFor="cv" className="text-sm font-semibold text-white">
                                Pass Foto
                            </label>
                            <button
                                onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                                className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                            >
                                {dataMahasiswa.name} - CV.pdf
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 pb-1">
                            <label htmlFor="cv" className="text-sm font-semibold text-white">
                                KTM
                            </label>
                            <button
                                onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                                className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                            >
                                {dataMahasiswa.name} - CV.pdf
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 pb-1">
                            <label htmlFor="cv" className="text-sm font-semibold text-white">
                                KTM
                            </label>
                            <button
                                onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                                className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                            >
                                {dataMahasiswa.name} - CV.pdf
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 pb-1">
                            <label htmlFor="cv" className="text-sm font-semibold text-white">
                                KTP
                            </label>
                            <button
                                onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                                className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                            >
                                {dataMahasiswa.name} - CV.pdf
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 pb-1">
                            <label htmlFor="cv" className="text-sm font-semibold text-white">
                                Rangkuman Nilai
                            </label>
                            <button
                                onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                                className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                            >
                                {dataMahasiswa.name} - CV.pdf
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 pb-1">
                            <label htmlFor="cv" className="text-sm font-semibold text-white">
                                Certificate
                            </label>
                            <button
                                onClick={() => window.open('../../../../../public/CV.pdf', '_blank', 'noopener,noreferrer')} // Ganti dengan URL file
                                className="text-white caret-white border-[#1b1d2e] border-2 h-9 w-full flex items-center px-3 py-1 rounded-md"
                            >
                                {dataMahasiswa.name} - CV.pdf
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileTabletDesktopDashboardUser;
