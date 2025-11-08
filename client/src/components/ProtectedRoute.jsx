import { useLogin } from "../context/LoginContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    // Give some time for the login verification to complete
    const timer = setTimeout(() => {
      setHasCheckedAuth(true);
    }, 100); // Small delay to let the context initialize

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only redirect after we've given time for auth check AND user is not logged in
    if (hasCheckedAuth && isLoggedIn === false) {
      navigate("/home", { replace: true });
    }
  }, [isLoggedIn, hasCheckedAuth, navigate]);

  // Show loading while authentication is being verified
  if (!hasCheckedAuth || isLoggedIn === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isLoggedIn ? children : null;
}