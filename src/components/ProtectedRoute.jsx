import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ admin = false, children }) {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  if (loading) return <div className="route-loader" aria-label="Loading"><span /></div>;
  if (!user) return <Navigate to="/account" replace state={{ from: location.pathname }} />;
  if (admin && !isAdmin) return <Navigate to="/account" replace />;
  if (admin && user.mustChangePassword) return <Navigate to="/account" replace state={{ from: location.pathname }} />;
  return children;
}
