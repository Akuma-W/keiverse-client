import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { FooterC, HeaderC } from '@/components/layout';
import { AppSidebar } from '@/components/layout/AppSidebar';

const AdminLayout = () => {
  const { isLoggedIn } = useAuth();
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <HeaderC isLoggedIn={isLoggedIn} onOpenSidebar={() => setOpenSidebar(true)} />

      {/* Body */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar */}
        <AppSidebar
          isOpen={openSidebar}
          activePath={location.pathname}
          onNavigate={(path) => {
            navigate(path);
            setOpenSidebar(false); // UX tốt hơn cho mobile
          }}
        />

        {/* Overlay mobile */}
        {openSidebar && (
          <div
            className="lg:hidden fixed inset-0 z-20 bg-black/50"
            onClick={() => setOpenSidebar(false)}
          />
        )}

        {/* Main content */}
        <main
          className={cn(
            'flex-1 overflow-y-auto transition-all duration-300',
            'p-4 md:p-8',
            'lg:ml-72', // đúng bằng w-72 của sidebar
          )}
        >
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>

      <FooterC />
    </div>
  );
};

export default AdminLayout;
