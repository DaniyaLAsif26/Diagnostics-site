import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import 'react-phone-input-2/lib/style.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import '../Login/Login.css';
import { useLogin } from '../../context/LoginContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function adminLoginForm() {
    const navigate = useNavigate();

    const { showAdminForm, toggleAdminForm } = useLogin();

    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const adminLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch("http://localhost:5000/api/admin-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            let data;
            try {
                data = await res.json();
            } catch {
                throw new Error("Invalid server response");
            }

            if (!data.success) {
                setError(data.message || "Login failed");
                return;
            }
            toggleAdminForm();
            localStorage.setItem("isAdminLoggedIn", "true");
            navigate('/admin/dashboard');
        }
        catch (error) {
            console.log("Error during admin login:", error);
        }
    }

    if (!showAdminForm) return null;

    return (
        <>
            <div className="login-overlay" />
            <div className="login-cont">
                <div className="login-form">
                    <h1>Admin Login</h1>
                    <form onSubmit={adminLogin}>
                        <Box display="flex" flexDirection="column" gap={2}>

                            <CancelIcon
                                fontSize="medium"
                                className="cancel-icon"
                                onClick={toggleAdminForm}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Username"
                                variant="outlined"
                                autoComplete="off"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            border: '1.5px solid black',   // default border color
                                        },
                                    },
                                }}
                            />

                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            border: '1.5px solid black',
                                        },
                                    }
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
                                Login
                            </Button>
                        </Box>
                    </form>
                </div>
            </div>

        </>
    );
}

