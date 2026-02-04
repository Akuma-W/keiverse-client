import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '@/features/auth/auth.slice';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.auth);

  const isLoggedIn = Boolean(user);
  const userRole = user?.role.name;

  const canAcess = (roles?: string | string[]) => {
    if (!roles) return true;
    if (!userRole) return false;
    if (Array.isArray(roles)) return roles.includes(userRole);
    return userRole === roles;
  };

  const logout = () => {
    dispatch(logoutThunk());
    navigate('/login');
  };

  return { user, accessToken, isLoggedIn, userRole, canAcess, logout };
};
