import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import '../Login/Login.css';
import { useLogin } from '../../context/LoginContext';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function OtpInput({ length = 6, onOtpSubmit = () => { } }) {

    const navigate = useNavigate()

    const { showOtpForm, OtpForm, mobileNo, setMobileNo, setIsLoggedIn, setAllUserData, fromPath, setLoginMsg } = useLogin();

    const from = fromPath || '/user-profile';

    const [error, setError] = useState('');
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);


    const formatedNumber = (number) => {
        if (!number) return '';
        let numberInFormat = number.replace(91, '+91 - ');
        return numberInFormat;
    };

    useEffect(() => {
        if (OtpForm && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [OtpForm]);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        const combinedOtp = newOtp.join('');
        if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

        // Auto focus next input
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleClick = (index) => {
        // Place cursor at the end
        inputRefs.current[index].setSelectionRange(
            0,
            inputRefs.current[index].value.length
        );

        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf('')].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleClose = () => {
        showOtpForm();
        setMobileNo('');
        setError('');
        setOtp(new Array(length).fill(''));
    };

    const submitOtp = async (e) => {
        e.preventDefault();
        if (otp.join('').length < length) {
            setError(`Please enter a ${length}-digit OTP`);
            return;
        } else {
            try {
                const res = await fetch(`${BackendURL}/api/login/verify-otp`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        mobileNo,
                        otp: otp.join('')
                    })
                })
                const Data = await res.json();
                // console.log("data", Data);


                if (Data.data.Status === 'Success') {
                    setIsLoggedIn(true)
                    console.log("OTP verified successfully");
                    handleClose();
                    // console.log(Data.user.number)
                    setAllUserData({
                        number: Data.user.number,
                        name: Data.user.name,
                        second_number: Data.user.second_number,
                        address: Data.user.address
                    });
                    setLoginMsg("Login Successful")

                    if (!Data.user.name || !Data.user.address || !Data.user.second_number) {
                        navigate("/user-profile/edit")
                    }
                    else {
                        // navigate("/user-profile")
                        navigate(from)

                    }
                }
                else {
                    setError("Invalid OTP. Please try again.");
                }
            }
            catch (error) {
                console.log("error", error)
            }
        };
    }
    if (!OtpForm) return null;

    return (
        <>
            <div className="login-overlay" />
            <div className="login-cont">
                <div className="login-form">
                    <h1>Verify Code</h1>
                    <div className="otp-msg">
                        Enter {length}-digit OTP received on the mobile number{' '}
                        {formatedNumber(mobileNo)}
                    </div>
                    <form onSubmit={submitOtp}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <CancelIcon
                                fontSize="medium"
                                className="cancel-icon"
                                onClick={handleClose}
                            />

                            <div>
                                {otp.map((value, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        ref={(input) =>
                                            (inputRefs.current[index] = input)
                                        }
                                        value={value}
                                        onChange={(e) => {
                                            if (error) setError('');
                                            handleChange(index, e);
                                        }}
                                        onClick={() => handleClick(index)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="otpInput"
                                        maxLength={1}
                                    />
                                ))}
                            </div>

                            {error && (
                                <Alert
                                    variant="filled"
                                    severity="error"
                                    sx={{
                                        color: 'white',
                                        backgroundColor: '#fe8383ff',
                                    }}
                                >
                                    {error}
                                </Alert>
                            )}

                            {/* <div id="recaptcha-container" /> */}
                            <div className="otp-btns">
                                <div className="">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={otp.join("").length < length}

                                        sx={{
                                            textTransform: 'none',
                                            fontSize: '1.2rem',
                                            marginBottom: '2rem',
                                        }}
                                    >
                                        Verify
                                    </Button>
                                </div>
                                <div className=""> <Button variant="outlined"
                                    onClick={() => setOtp(new Array(length).fill(""))}

                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '1.2rem',
                                        marginBottom: '2rem',
                                    }}
                                >Clear</Button></div>

                            </div>
                            <a href="#">
                                <b>Resend OTP</b>
                            </a>
                        </Box>
                    </form>
                </div>
            </div>
        </>
    );
}
