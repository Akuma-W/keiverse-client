import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { FooterC, HeaderC, Navbar } from '@/components/layout';
import NavSidebar from '@/components/layout/NavSidebar';

const AuthLayout = () => {
  const { isLoggedIn } = useAuth();
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <HeaderC
        isLoggedIn={isLoggedIn}
        onOpenSidebar={() => setOpenSidebar(true)}
        showSign={false}
      />
      <Navbar />
      <NavSidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />

      <main className="flex-1 relative py-4 px-4">
        <Outlet />
      </main>
      <FooterC />
    </div>
  );
};

export default AuthLayout;
