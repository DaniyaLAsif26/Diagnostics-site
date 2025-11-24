import { useLogin } from "../context/LoginContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, isCheckingUser } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect after auth check is complete and user is not logged in
    if (!isCheckingUser && !isLoggedIn) {
      navigate("/home", { replace: true });
    }
  }, [isLoggedIn, isCheckingUser, navigate]);

  // Show loading while authentication is being verified
  if (isCheckingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Render children only if logged in
  return isLoggedIn ? children : null;
}