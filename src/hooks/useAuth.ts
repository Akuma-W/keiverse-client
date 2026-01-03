import { useAppSelector } from '@/store/hooks';

export const useAuth = () => {
  const { user, accessToken } = useAppSelector((state) => state.auth);

  const isLoggedIn = Boolean(user && accessToken);
  const userRole = user?.role;

  const canAcess = (roles?: string | string[]) => {
    if (!roles) return true;
    if (!userRole) return false;
    if (Array.isArray(roles)) return roles.includes(userRole);
    return userRole === roles;
  };

  return { user, accessToken, isLoggedIn, userRole, canAcess };
};
