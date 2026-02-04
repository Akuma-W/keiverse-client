import { BookOpen, Home, Mail, Shuffle, X, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Logo from '../logo/Logo';
import { Button } from '../ui/button';
import type { DrawerProps } from './drawer-props.interface';

interface MobileMenuProps extends DrawerProps {
  isLoggedIn: boolean;
}

const MobileMenuDrawer = ({ open, onClose, isLoggedIn }: MobileMenuProps) => {
  const { t } = useTranslation('common');
  const location = useLocation();

  const navItems = [
    { key: 'home', path: '/', icon: Home },
    { key: 'classes', path: '/dashboard', icon: BookOpen },
    { key: 'quizzes', path: '/quiz', icon: Zap },
    { key: 'random', path: '/random', icon: Shuffle },
    { key: 'contact', path: '/contact', icon: Mail },
  ];

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      )}

      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-full max-w-xs bg-white p-6 transition-transform',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              onClick={onClose}
              className={cn(
                'flex items-center gap-4 p-4 rounded-2xl text-sm font-black uppercase tracking-widest transition',
                location.pathname === item.path
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50',
              )}
            >
              <item.icon className="h-5 w-5" />
              {t(`navbar.${item.key}`)}
            </Link>
          ))}
        </nav>

        {/* Auth actions */}
        {!isLoggedIn && (
          <div className="mt-auto pt-6 flex flex-col gap-3">
            <Button
              onClick={() => {
                onClose();
              }}
            >
              Đăng nhập
            </Button>
            <Button variant="secondary">Đăng ký</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileMenuDrawer;
