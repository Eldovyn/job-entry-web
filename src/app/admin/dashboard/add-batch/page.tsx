import SideBar from "@/components/sidebar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddBatch = () => {
    return (
        <>
            <div className="flex bg-[#0b0d14]">
                <SideBar category="admin" />
                <main className={`flex-1 ml-20 sm:ml-40 lg:ml-72 p-8 h-screen bg-[#0b0d14] flex items-center justify-center`}>
                    <div className="h-screen bg-[#0b0d14] flex items-center justify-center md:w-[95%] lg:w-[90%] w-full">
                        <div className="bg-[#12141e] md:w-[75%] lg:w-[60%] w-[85%] border-2 p-8 rounded-md border-[#1f2236]">
                            <p className="text-white text-2xl font-semibold text-center border-b-2 border-[#1f2236] pb-3">
                                Batch Pendaftaran
                            </p>
                            <form action="" className="mt-3">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-white">
                                        Title
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder={'title'}
                                        className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 pt-2">
                                    <label className="text-sm font-semibold text-white">
                                        Duration
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder={'Duration'}
                                        className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        className="mt-3 bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[7rem]"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default AddBatch