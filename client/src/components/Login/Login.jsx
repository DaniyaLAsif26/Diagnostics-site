import PhoneInput from 'react-phone-input-2';
import Alert from '@mui/material/Alert';
import 'react-phone-input-2/lib/style.css';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import '../Login/Login.css';
import { useLogin } from '../../context/LoginContext';
import { useState, useEffect } from 'react';

import logo from '../../assets/logo.png'

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function LoginForm() {
    const { showLoginForm, toggleLoginForm, showOtpForm, mobileNo, setMobileNo } = useLogin();

    const [error, setError] = useState('');

    const closeLoginForm = () => {
        setMobileNo('');
        setError('');
        toggleLoginForm();
    }

    const submitOtp = async (e) => {
        e.preventDefault();
        if (!mobileNo || mobileNo == '' || mobileNo == null || mobileNo.length < 12) {
            setError("Please enter a valid phone number");
        } else {
            try {
                const res = await fetch(`${BackendURL}/api/login/send-otp`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ mobileNo })
                    }
                )
                const data = await res.json();

                if (data.Status === "Success") {
                    toggleLoginForm();
                    showOtpForm();
                } else {
                    setError(data.Message);
                }
            }
            catch (error) {
                console.log("error", error)
            }

        }
    }

    useEffect(() => {
        if (showLoginForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // cleanup on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showLoginForm])

    if (!showLoginForm) return null;

    return (
        <>
            <div className="login-overlay" />
            <div className="login-cont">
                <div className="nav-logo">
                    <img src={logo} alt="" />
                    <div className="logo-name">
                        VISION <br />
                        DIAGNOSTIC <br />
                        CENTER
                    </div>
                </div>
                <div className="login-form">
                    <h1>Log In </h1>
                    <form onSubmit={submitOtp}>
                        <Box display="flex" flexDirection="column" gap={2}>

                            <CancelIcon
                                fontSize="medium"
                                className="cancel-icon"
                                onClick={closeLoginForm}
                            />

                            <PhoneInput
                                className='phone-input'
                                country={'in'}
                                onlyCountries={['in']}
                                value={mobileNo}
                                onChange={(value) => {
                                    setMobileNo(value);
                                    if (error) setError("");
                                }}
                                countryCodeEditable={false}
                                disableDropdown={true}
                                containerStyle={{ width: '100%' }}
                                inputStyle={{
                                    borderRadius: '4px',
                                    border: '1px solid #817a7aff',
                                    color: 'black',
                                }}
                            />
                            {error && (
                                <Alert variant="filled" severity="error" sx={{
                                    color: 'white',
                                    backgroundColor: '#fe8383ff',
                                }}>
                                    {error}
                                </Alert>
                            )}

                            <div id='recaptcha-container' />
                            <div className="phone-btn">
                                <button
                                    type="submit">
                                    Send OTP via SMS
                                </button>
                            </div>
                        </Box>
                    </form>
                </div>
            </div>
        </>
    );
}

