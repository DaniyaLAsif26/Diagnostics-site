import { useLogin } from "../../context/LoginContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
    const { isAdminLogIn, isCheckingAdmin } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        // Only redirect after we've given time for auth check AND user is not logged in
        if (!isCheckingAdmin && !isAdminLogIn) {
            navigate("/home", { replace: true });
        }
    }, [isAdminLogIn, isCheckingAdmin, navigate]);

    // Show loading while authentication is being verified
    if (isCheckingAdmin) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return isAdminLogIn ? children : null;
}