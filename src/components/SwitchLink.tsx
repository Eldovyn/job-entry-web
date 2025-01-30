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

export default SwitchAuthLink;
