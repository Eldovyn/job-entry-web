import AuthForm from "../../../layout/AuthForm"

const LoginPage = () => {
    return (
        <>
            <div className="bg-[#0b0d14] h-screen flex items-center justify-center w-full text-white">
                <AuthForm
                    title="Login To Your Account"
                    buttonText="login"
                    switchText="dont have an account?"
                    switchLink="register"
                    isRegister={false}
                />
            </div>
        </>
    )
}

export default LoginPage