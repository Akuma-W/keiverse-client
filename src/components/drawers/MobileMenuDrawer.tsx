import { BookOpen, Home, Mail, Shuffle, X, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Logo from '../logo/Logo';
import { Button } from '../ui/button';
import type { DrawerProps } from './drawer-props.interface';

const MobileMenuDrawer = ({ open, onClose }: DrawerProps) => {
  const { t } = useTranslation('common');
  const location = useLocation();
  const navigate = useNavigate();

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

      <aside
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-full max-w-xs bg-white shadow-2xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <Logo size="md" />
            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
              <X className="h-6 w-6 text-slate-400" />
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
          <div className="mt-auto pt-8 border-t">
            <Button
              className="w-full h-14 rounded-2xl mb-4"
              onClick={() => {
                onClose();
                navigate('/login');
              }}
            >
              {t('header.login')}
            </Button>

            <Button
              variant="secondary"
              className="w-full h-14 rounded-2xl"
              onClick={() => {
                onClose();
                navigate('/register');
              }}
            >
              {t('header.register')}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileMenuDrawer;
