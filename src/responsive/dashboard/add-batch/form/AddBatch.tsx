import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface Props {
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
}

const AddBatch: React.FC<Props> = ({ isDesktop, isTablet, isMobile }) => {
    if (!isDesktop && !isTablet && !isMobile) return null;

    return (
        <form action="" className="mt-3">
            {['title', 'description'].map((label, index) => (
                <div key={index} className="flex flex-col gap-2 pt-2">
                    <label className="text-sm font-semibold text-white">
                        {label}
                    </label>
                    <Input
                        type="text"
                        placeholder={label}
                        className="text-white caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
                    />
                </div>
            ))}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="mt-3 bg-[#4b5fe2] text-white hover:bg-[#4b5fe2] hover:text-white w-[7rem]"
                >
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default AddBatch;