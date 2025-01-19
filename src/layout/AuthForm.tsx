import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AuthFormProps {
    title: string;
    buttonText: string;
    switchText: string;
    switchLink: string;
    Category: "register" | "login" | "reset-password";
}

const InputField: React.FC<{ type: string; placeholder: string }> = ({ type, placeholder }) => (
    <div className="flex flex-col mb-3">
        <Input
            type={type}
            placeholder={placeholder}
            className="caret-white border-[#1b1d2e] border-2 focus:border-[#4b5fe2]"
        />
    </div>
);

const SwitchAuthLink: React.FC<{ switchText: string; switchLink: string; Category: string }> = ({
    switchText,
    switchLink,
    Category,
}) => (
    <div className="flex flex-row mt-3">
        <p className="text-[#b5b7da] text-sm">{switchText}</p>
        <a href={switchLink} className="ms-1 text-sm">
            <p className="text-blue-600">{Category === "register" ? "login" : Category === "reset-password" ? "login" : "register"}</p>
        </a>
    </div>
);

const AuthForm: React.FC<AuthFormProps> = ({
    title,
    buttonText,
    switchText,
    switchLink,
    Category,
}) => {
    return (
        <div className="bg-[#12141e] w-[25%] p-8 rounded-md mt-9 border-[#1f2236] border-2">
            <p className="text-2xl font-bold mb-3 text-white">{title}</p>
            <form action="">
                {(Category === "register" || Category === "login") && (
                    <InputField type="text" placeholder="username" />
                )}

                {(Category === "register" || Category === "reset-password") && (
                    <InputField type="email" placeholder="email" />
                )}

                {(Category === "register" || Category === "login") && (
                    <InputField type="password" placeholder="password" />
                )}

                {Category === "login" && (
                    <div className="flex flex-col mb-3">
                        <a href="/forgot-password" className="flex justify-end text-[#b5b7da] text-sm focus:text-[#4b5fe2]">
                            forgot password
                        </a>
                    </div>
                )}

                <Button className="bg-[#4b5fe2] hover:bg-[#4558cf] w-full">{buttonText}</Button>

                {(Category === "register" || Category === "login" || Category === "reset-password") && (
                    <SwitchAuthLink switchText={switchText} switchLink={switchLink} Category={Category} />
                )}
            </form>
        </div>
    );
};

export default AuthForm;
