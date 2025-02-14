import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";

interface Props {
    category: string
}

const SearchBatch: React.FC<Props> = ({ category }) => {
    const { push } = useRouter();

    const formik = useFormik({
        initialValues: {
            q: '',
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { q } = values;
                if (category === 'admin') {
                    push(`/admin/dashboard/batch?current_page=1&q=${q}`);
                } else {
                    push(`/?current_page=1&q=${q}`);
                }
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            formik.submitForm();
        }
    };

    return (
        <form onSubmit={formik.isSubmitting ? () => {} : formik.handleSubmit} className="relative lg:w-[40%] md:w-[60%] w-full flex">
            <Input
                className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2] pr-10 h-[2.2rem] text-white"
                placeholder="cari sesuai title/id"
                type="text"
                name="q"
                value={formik.values.q}
                onChange={formik.handleChange}
                onKeyDown={handleKeyDown}
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <FaSearch />
            </span>
        </form>
    );
};

export default SearchBatch;
