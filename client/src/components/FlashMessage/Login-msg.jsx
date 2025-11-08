import { useLogin } from "../../context/LoginContext"
import Alert from '@mui/material/Alert';

import { useEffect } from "react";

export default function LoginMsg() {

    const { loginMsg, clearLoginMsg } = useLogin();

    useEffect(() => {
        if (loginMsg) {
            const timer = setTimeout(() => clearMessage(), 3000);
            return () => clearTimeout(timer);
        }
    }, [loginMsg, clearLoginMsg]);

    if (!loginMsg) return null;

    return (
        <div className="login-msg-cont ">
            <div className="login-msg">
                <Alert variant="filled" severity="success">
                    {loginMsg}
                </Alert>
            </div>
        </div>
    )
}