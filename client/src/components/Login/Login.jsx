import PhoneInput from 'react-phone-input-2';
import Alert from '@mui/material/Alert';
import 'react-phone-input-2/lib/style.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import '../Login/Login.css';
import { useLogin } from '../../context/LoginContext';
import { useState } from 'react';

export default function LoginForm() {
    const { showLoginForm, toggleLoginForm, showOtpForm } = useLogin();

    const [number, setNumber] = useState('');
    const [error, setError] = useState('');

    const submitOtp = (e) => {
        e.preventDefault();
        if (!number || number == '' || number == null || number.length < 12) {
            setError("Please enter a valid phone number");
        } else {
            toggleLoginForm(number);
            showOtpForm();
        }
        console.log("hi")

    }

    if (!showLoginForm) return null;

    return (
        <>
            <div className="login-overlay" />
            <div className="login-cont">
                <div className="login-form">
                    <h1>Log In / Sign Up</h1>
                    <form onSubmit={submitOtp}>
                        <Box display="flex" flexDirection="column" gap={2}>

                            <CancelIcon
                                fontSize="medium"
                                className="cancel-icon"
                                onClick={toggleLoginForm}
                            />

                            <PhoneInput
                                country={'in'}
                                onlyCountries={['in']}
                                value={number}
                                onChange={(value) => {
                                    setNumber(value);
                                    if (error) setError("");
                                }}
                                countryCodeEditable={false}
                                disableDropdown={true}
                                containerStyle={{ width: '100%' }}
                                inputStyle={{
                                    height: '3.6rem',
                                    borderRadius: '4px',
                                    border: '1px solid #817a7aff',
                                    color: 'black',
                                    fontSize: '1.26rem',
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

                            <Button type="submit" variant="contained" sx={{
                                textTransform: 'none',
                                fontSize: "1.2rem",
                                marginBottom: '2rem'
                            }}>
                                Send OTP via SMS
                            </Button>
                        </Box>
                    </form>
                </div>
            </div>
        </>
    );
}

