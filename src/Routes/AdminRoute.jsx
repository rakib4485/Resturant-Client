import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { useAuth } from "../context/AuthContext";

export const AdminRoute = ({ children }) => {
  const { user, token, loading } = useAuth();

  if (loading) return <p className="p-6">Checking auth...</p>;

  if (!token) return <Navigate to="/auth/login" replace />;

  if (user?.role !== "admin") return <Navigate to="/" replace />;

  return children;
};