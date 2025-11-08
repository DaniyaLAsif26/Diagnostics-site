import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { useLogin } from '../../context/LoginContext.jsx';
import { useNavigate } from 'react-router-dom';

import './Nav-sign.css'

export default function NavSearch() {
    const navigate = useNavigate()

    const { toggleLoginForm, isLoggedIn } = useLogin();

    const navigateUserProfile = () => {
        navigate("/user-profile")
    }

    return (
        <div className="nav-signIn">
            {isLoggedIn ? (
                <PersonIcon sx={{ border: '2px solid black', cursor: 'pointer' }} onClick={navigateUserProfile} />
            ) : (
                <Button
                    onClick={toggleLoginForm}
                    variant="contained"
                    size="small">
                    Sign in
                </Button>
            )}
        </div>
    )
}