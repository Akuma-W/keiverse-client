import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { FooterC, HeaderC } from '@/components/layout';

const PublicLayout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderC isLoggedIn={isLoggedIn} />
      <main className="flex-1 mx-auto max-w-7xl w-full">
        <Outlet />
      </main>
      <FooterC />
    </div>
  );
};

export default PublicLayout;
