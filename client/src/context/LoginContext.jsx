import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import { useTrigger } from "./TriggerContext";
import { useCart } from "./CartContext";

const LoginContext = createContext();

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const LoginProvider = ({ children }) => {
    const navigate = useNavigate()

    const { clearCart } = useCart();
    const { dataChanged } = useTrigger();

    const [fromPath, setFromPath] = useState('/user-profile');
    const [loginMsg, setLoginMsg] = useState("")

    const [mobileNo, setMobileNo] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdminLogIn, setIsAdminLogin] = useState(false)


    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showAdminForm, setShowAdminForm] = useState(false);
    const [OtpForm, setOtpForm] = useState(false);

    const [userData, setUserData] = useState({
        name: '',
        phone_no: '',
        alt_no: null,
        address: '',
        appointments: [],
        reports: []
    })

    const setAllUserData = (data) => {
        setUserData({
            phone_no: data.number || '',
            name: data.name || '',
            alt_no: data.second_number ? String(data.second_number) : '', // <-- convert to string
            address: data.address || '',
            appointments: data.appointments || [],
            reports: data.reports || []
        });
    };


    const updateUserData = (field, value) => {
        setUserData((prev) => ({ ...prev, [field]: value }));
    };

    const clearLoginMsg = () => {
        setLoginMsg("")
    }

    useEffect(() => {
        const verifyLogin = async () => {
            try {
                const response = await fetch(`${BackendURL}/api/login/verify/user`,
                    {
                        method: "GET",
                        credentials: "include"
                    }
                )
                const data = await response.json()
                // console.log(data)
                if (data.Success) {
                    setIsLoggedIn(true)
                    setAllUserData(data.user)
                    if (!data.user.name) {
                        navigate("/user-profile/edit")
                    }
                }
                else {
                    setIsLoggedIn(false)
                }
            }
            catch (error) {
                console.log(error)
                setIsLoggedIn(false)
            }

        }
        verifyLogin()
    }, [dataChanged])

    const logout = async () => {
        const response = await fetch(`${BackendURL}/api/logout/user`,
            {
                method: "POST",
                credentials: "include"
            }
        );

        const data = await response.json()
        // console.log(data)
        setIsLoggedIn(false)
        setAllUserData({})
        clearCart();
        setLoginMsg("Logged out successfully")
    }

    useEffect(() => {
        const verifyAdmin = async () => {
            try {
                const res = await fetch(`${BackendURL}/api/login/verify/admin`, {
                    method: "GET",
                    credentials: "include"
                })

                const data = await res.json()
                // console.log(data)

                if (data.Success) {
                    setIsAdminLogin(true)
                } else {
                    setIsAdminLogin(false)
                }
            }
            catch (error) {
                console.log(error)
                setIsAdminLogin(false)
            }
        }
        verifyAdmin()
    }, [])

    const logoutAdmin = async () => {
        try {
            const res = await fetch(`${BackendURL}/api/logout/admin`, {
                method: 'POST',
                credentials: "include"
            })

            const data = await res.json()
            if (data.Success) {
                setIsAdminLogin(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    //toggle login form
    const toggleLoginForm = () => {
        setShowLoginForm((prev) => !prev);
    };

    //toggle otp form
    const showOtpForm = () => {
        setOtpForm((prev) => !prev);
    }

    //toggle admin form
    const toggleAdminForm = () => {
        setShowAdminForm((prev) => !prev);
    }

    return (
        <LoginContext.Provider value={{
            showLoginForm, OtpForm, showAdminForm, toggleLoginForm, showOtpForm, toggleAdminForm, isLoggedIn, setIsLoggedIn, userData, setUserData, logout, setAllUserData, updateUserData,
            mobileNo, setMobileNo, isAdminLogIn, setIsAdminLogin, logoutAdmin, fromPath,
            setFromPath, loginMsg, setLoginMsg, clearLoginMsg
        }}>
            {children}
        </LoginContext.Provider>
    );
}

export const useLogin = () => useContext(LoginContext);