import { Bell, Menu, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Logo from '../logo/Logo';
import { Button } from '../ui/button';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  isLoggedIn: boolean;
  onOpenDrawer: (type: 'chat' | 'notifications' | 'mobile') => void;
}

const Navbar = ({ isLoggedIn, onOpenDrawer }: NavbarProps) => {
  const { t } = useTranslation('common');
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'classes', path: '/dashboard' },
    { key: 'quizzes', path: '/quiz' },
    { key: 'random', path: '/random' },
    { key: 'contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="container h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button className="lg:hidden" onClick={() => onOpenDrawer('mobile')}>
            <Menu />
          </button>

          <Link to={'/'}>
            <Logo size="md" withSlogan={true} />
          </Link>

          <nav className="hidden lg:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={cn(
                  'text-xs font-bold uppercase',
                  location.pathname === item.path ? 'text-indigo-600' : 'text-slate-500',
                )}
              >
                {t(`navbar.${item.key}`)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Tool bar */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {!isLoggedIn ? (
            <>
              <Button size={'sm'} onClick={() => navigate('/login')}>
                {t('header.login')}
              </Button>
              <Button size={'sm'} variant={'secondary'} onClick={() => navigate('/register')}>
                {t('header.register')}
              </Button>
            </>
          ) : (
            <>
              <button onClick={() => onOpenDrawer('notifications')}>
                <Bell />
              </button>
              <button onClick={() => onOpenDrawer('chat')}>
                <MessageSquare />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
