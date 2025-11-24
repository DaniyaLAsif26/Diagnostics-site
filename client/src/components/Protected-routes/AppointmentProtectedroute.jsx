import { useLogin } from "../../context/LoginContext";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AppointmentProtectedRoute({ children }) {
    const { isLoggedIn, isCheckingAuth } = useLogin(); // ✅ Fixed: isCheckingAuth
    const { cartItem } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ Wait for auth check to complete before redirecting
        if (!isCheckingAuth) {
            // Redirect if not logged in
            if (!isLoggedIn) {
                navigate("/home", { replace: true });
                return;
            }
            
            // Redirect if cart is empty (only after confirming user is logged in)
            if (cartItem.length === 0) {
                navigate("/home", { replace: true });
            }
        }
    }, [isLoggedIn, isCheckingAuth, navigate, cartItem]);

    // ✅ Show loading only while checking authentication
    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // ✅ Return null while redirecting (prevents flash of content)
    if (!isLoggedIn || cartItem.length === 0) {
        return null;
    }

    // ✅ Only render children if both conditions are met
    return children;
}