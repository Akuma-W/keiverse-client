import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { BreadcrumbC, FooterC, HeaderC } from '@/components/layout';

const DefaultLayout = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderC isLoggedIn={isLoggedIn} />
      <BreadcrumbC segments={segments} />
      <main className="flex-1 mx-auto max-w-7xl w-full">
        <Outlet />
      </main>
      <FooterC />
    </div>
  );
};

export default DefaultLayout;
