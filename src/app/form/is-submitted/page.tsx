import Link from "next/link"

const PageIsSubmitted = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className={`bg-[#12141e] w-[50%] p-8 border-2 border-[#1f2236] rounded-md`}>
                    <p className="text-white text-md font-semibold text-center">
                        Form Pendaftaran Telah di Submit
                    </p>
                    <Link href="/">
                        <p className="text-[10px] text-blue-500 underline font-semibold text-right">
                            Back To Home
                        </p>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PageIsSubmitted