import { useLogin } from "../../context/LoginContext";
import { useCart } from "../../context/CartContext";
import { useAppointment } from "../../context/AppointmentContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutProtectedRoute({ children }) {
    const { isLoggedIn, isCheckingUser } = useLogin();
    const { cartItem } = useCart();
    const { appointment } = useAppointment();
    const navigate = useNavigate();

    useEffect(() => {
        // Only run validation after auth check is complete
        if (isCheckingUser) return;

        // Check if user is not logged in
        if (!isLoggedIn) {
            navigate("/home", { replace: true });
            return;
        }

        // Check if cart is empty
        if (!cartItem || cartItem.length === 0) {
            navigate("/home", { replace: true });
            return;
        }

        // Check if appointment is incomplete
        if (!appointment || !appointment.date || !appointment.radio || !appointment.time) {
            navigate("/home", { replace: true });
            return;
        }
    }, [isLoggedIn, isCheckingUser, cartItem, appointment, navigate]);

    // Show loading while authentication is being verified
    if (isCheckingUser) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Render children only if all conditions are met
    if (isLoggedIn && cartItem?.length > 0 && appointment?.date && appointment?.radio && appointment?.time) {
        return children;
    }

    // Return null while redirecting
    return null;
}