import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return <p className="p-6">Checking auth...</p>;

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};