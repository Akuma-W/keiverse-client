import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  roles?: string[]; // ['admin','teacher','student']
}

const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { isLoggedIn, canAcess } = useAuth();

  if (!isLoggedIn) return <Navigate to={'/login'} />;
  if (!canAcess(roles)) return <Navigate to={'/unauthorized'} />;
  return <Outlet />;
};

export default ProtectedRoute;
