import Button from '@mui/material/Button';
import { useLogin } from '../../context/LoginContext.jsx';

export default function NavSearch() {
    const { toggleLoginForm } = useLogin();

    return (
        <div className="nav-signIn">
            <Button
                onClick={toggleLoginForm}
                variant="contained"
                size="medium">
                Sign in
            </Button>
        </div>
    )
}