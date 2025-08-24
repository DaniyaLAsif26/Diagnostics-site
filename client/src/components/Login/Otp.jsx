import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import '../Login/Login.css';
import { useLogin } from '../../context/LoginContext';
import { useEffect, useRef, useState } from "react";
import { set } from 'mongoose';

export default function OtpInput({ length = 4, onOtpSubmit = () => { } }) {
    const { showOtpForm, OtpForm, mobileNo } = useLogin();

    const [error, setError] = useState('');
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            inputRefs.current[index - 1].focus();
        }
    };

    const submitOtp = (e) => {
        e.preventDefault();
        if (otp.join("").length < 4) {
            setError("Please enter a valid OTP");
            return;
        }
        console.log(otp.join(""));
    };

    if (!OtpForm) return null;

    return (
        <>
            <div className="login-overlay" />
            <div className="login-cont">
                <div className="login-form">
                    <h1>Verify Code</h1>
                    <div className='otp-msg'>Enter {length}-digit OTP received on the mobile number {mobileNo}</div>
                    <form onSubmit={submitOtp}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <CancelIcon
                                fontSize="medium"
                                className="cancel-icon"
                                onClick={showOtpForm}
                            />

                            <div>
                                {otp.map((value, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        ref={(input) => (inputRefs.current[index] = input)}
                                        value={value}
                                        onChange={(e) => {
                                            if (error) setError("");
                                            handleChange(index, e)
                                        }}
                                        onClick={() => handleClick(index)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="otpInput"
                                    />
                                ))}
                            </div>

                            {error && (
                                <Alert variant="filled" severity="error" sx={{
                                    color: 'white',
                                    backgroundColor: '#fe8383ff',
                                }}>
                                    {error}
                                </Alert>
                            )}

                            <div id='recaptcha-container' />

                            <Button type="submit" variant="contained" sx={{
                                textTransform: 'none',
                                fontSize: "1.2rem",
                                marginBottom: '2rem'
                            }}>
                                Verify
                            </Button>
                            <a href="#"><b>Resend OTP</b></a>
                        </Box>
                    </form>
                </div>
            </div>
        </>
    );
}
