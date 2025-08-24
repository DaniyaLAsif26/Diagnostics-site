import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  if (!isAdminLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
