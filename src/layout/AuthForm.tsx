import React from 'react'
import { Input } from "@/components/ui/input";
import RegisterForm from './auth/register/RegsiterForm';
import LoginForm from './auth/login/LoginForm';
import ForgotPassword from './auth/forgot-password/ForgotPassword';

interface AuthFormProps {
    catgory: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ catgory }) => {
    if (catgory === "register") {
        return <RegisterForm />;
    }
    if (catgory === "login") {
        return <LoginForm />
    }
    if (catgory === "reset-password") {
        return <ForgotPassword />
    }
};

export const SwitchAuthLink: React.FC<{ switchText: string; switchLink: string; Category: string }> = ({
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

