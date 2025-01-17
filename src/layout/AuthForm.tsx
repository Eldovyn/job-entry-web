import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AuthFormProps {
    title: string
    buttonText: string
    switchText: string
    switchLink: string
    Category: string
}

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, switchText, switchLink, Category }) => {
    return (
        <div className="bg-[#12141e] w-[50%] p-8 rounded-md mt-9 border-[#1f2236] border-2">
            <p className="text-2xl font-bold mb-3">{title}</p>
            <form action="">
                {Category === 'register' || Category === 'login' ? (
                    <div className="flex flex-col mb-3 mt-3">
                        <Input type="text" placeholder="username" className="border-[#1b1d2e] border-2" />
                    </div>
                ) : ''}
                {Category === 'register' || Category === 'reset-password' ? (
                    <div className="flex flex-col mb-3">
                        <Input type={Category ? "text" : "email"} placeholder={Category ? "email" : "email"} className="border-[#1b1d2e] border-2" />
                    </div>
                ) : ''}
                {Category === 'register' || Category === 'login' ? (
                    <div className="flex flex-col mb-3">
                        <Input type="password" placeholder="password" className="border-[#1b1d2e] border-2" />
                    </div>
                ) : ''}
                {Category === 'register' ? (
                    <div className="flex flex-col mb-3">
                        <p className="flex justify-end text-[#b5b7da] text-sm">forgot password</p>
                    </div>
                ) : ''}
                <Button className="bg-[#4b5fe2] hover:bg-[#4558cf] w-full">{buttonText}</Button>
                {Category === 'register' || Category === 'login' ? (
                    <div className="flex flex-col mt-3">
                        <p className="flex justify-center text-[#b5b7da] text-sm">{switchText} <a href={switchLink} className="text-[#4b5fe2]">{switchLink}</a></p>
                    </div>
                ) : ''}
            </form>
        </div>
    )
}

export default AuthForm
