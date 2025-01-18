import AuthForm from "../../../layout/AuthForm"

const RegisterPage = () => {
    return (
        <>
            <div className="bg-[#0b0d14] h-screen flex items-center justify-center w-full text-white">
                <AuthForm
                    title="Create Your Account"
                    buttonText="register"
                    switchText="have an account?"
                    switchLink="login"
                    Category={'register'}
                />
            </div>
        </>
    )
}

export default RegisterPage