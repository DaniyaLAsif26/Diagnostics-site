import { set } from "mongoose";
import { createContext, useState, useContext } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showAdminForm, setShowAdminForm] = useState(false);
    const [OtpForm, setOtpForm] = useState(false);

    const [mobileNo, setMobileNo] = useState('');

    const toggleLoginForm = (number) => {
        setShowLoginForm((prev) => !prev);
        setMobileNo(number);
    };

    const showOtpForm = () => {
        setOtpForm((prev) => !prev);
    }

    const toggleAdminForm = () => {
        setShowAdminForm((prev) => !prev);
    }

    return (
        <LoginContext.Provider value={{ showLoginForm, OtpForm, mobileNo, showAdminForm, toggleLoginForm, showOtpForm, toggleAdminForm }}>
            {children}
        </LoginContext.Provider>
    );
}

export const useLogin = () => useContext(LoginContext);