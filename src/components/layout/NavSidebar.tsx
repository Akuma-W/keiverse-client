import { LogOut, School, Settings, User, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import Logo from '../logo/Logo';
import { Button } from '../ui/button';

interface Props {
  open: boolean;
  onClose: () => void;
}

const NavSidebar = ({ open, onClose }: Props) => {
  const { user, isLoggedIn } = useAuth();
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items = [
    { key: 'home', path: '/' },
    { key: 'classes', path: '/dashboard' },
    { key: 'quizzes', path: '/quiz' },
    { key: 'random', path: '/random' },
    { key: 'contact', path: '/contact' },
  ];

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />}

      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b flex justify-between items-center">
          <Logo size="sm" />
          <Button variant={'ghost'} onClick={onClose}>
            <X />
          </Button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col p-4 gap-2">
          {items.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              onClick={onClose}
              className={cn(
                'px-4 py-2 rounded',
                pathname === item.path
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100',
              )}
            >
              {t(`navbar.${item.key}`)}
            </Link>
          ))}
        </nav>

        {/* Auth Area */}
        <div className="mt-auto p-4 border-t space-y-2">
          {!isLoggedIn ? (
            <>
              <Button
                variant={'secondary'}
                className="w-full"
                onClick={() => {
                  onClose();
                  navigate('/login');
                }}
              >
                {t('header.login')}
              </Button>
              <Button
                variant="brand"
                className="w-full"
                onClick={() => {
                  onClose();
                  navigate('/register');
                }}
              >
                {t('header.register')}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate(`/profile`)}
              >
                <User className="mr-2 h-4 w-4" />
                Hồ sơ cá nhân
              </Button>

              {user?.role.name === 'teacher' && (
                <Button
                  variant={'ghost'}
                  className="w-full justify-start"
                  onClick={() => navigate('dashboard')}
                >
                  <School className="mr-2 h-4 w-4" />
                  Quản lý lớp học
                </Button>
              )}

              {user?.role.name === 'admin' && (
                <Button
                  variant={'ghost'}
                  className="w-full justify-start"
                  onClick={() => navigate('admin')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Quản lý hệ thống
                </Button>
              )}
              <Button
                variant={'destructive'}
                className="w-full justify-start"
                onClick={() => {
                  // logout
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </Button>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default NavSidebar;
