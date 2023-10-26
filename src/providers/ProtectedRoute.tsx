import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return <></>

  if (!user) return <Navigate to="/" />;

  return <>{children}</>;
}