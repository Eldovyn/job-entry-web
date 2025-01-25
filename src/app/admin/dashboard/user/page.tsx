import { Input } from "@/components/ui/input";

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

const DashboardUser = () => {
    const dataMahasiswa: DataMahasiswa = {
        name: "Andana Farras Pramudita",
        noHp: "081234567890",
        tempatLahir: "Bandung",
        tanggalLahir: "01-01-2000",
        jenisKelamin: "Laki-laki",
        npm: "20201001",
        kelas: "TI-2A",
        lokasiKampus: "Bandung",
    }

    return (
        <>
            <div className="bg-[#0b0d14] h-screen flex items-center justify-center w-full">
                <div className="bg-[#12141e] w-[75%] border-2 p-8 rounded-md mt-9 border-[#1f2236]">
                    <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">Data User</p>
                    <div className="flex flex-col gap-3 mt-3">
                        <div className="flex flex-col">
                            <label htmlFor='noHp' className="text-sm font-semibold text-white mb-2">
                                Name
                            </label>
                            <p className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2] h-9 w-[35%] flex items-center px-3 py-1 rounded-md">{dataMahasiswa.name}</p>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='noHp' className="text-sm font-semibold text-white mb-2">
                                No HP
                            </label>
                            <p className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2] h-9 w-[35%] flex items-center px-3 py-1 rounded-md">{dataMahasiswa.noHp}</p>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='noHp' className="text-sm font-semibold text-white mb-2">
                                Tempat Lahir
                            </label>
                            <p className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2] h-9 w-[35%] flex items-center px-3 py-1 rounded-md">{dataMahasiswa.tempatLahir}</p>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='noHp' className="text-sm font-semibold text-white mb-2">
                                Tanggal Lahir
                            </label>
                            <p className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2] h-9 w-[35%] flex items-center px-3 py-1 rounded-md">{dataMahasiswa.tanggalLahir}</p>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='noHp' className="text-sm font-semibold text-white mb-2">
                                Jenis Kelamin
                            </label>
                            <p className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2] h-9 w-[35%] flex items-center px-3 py-1 rounded-md">{dataMahasiswa.jenisKelamin}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardUser