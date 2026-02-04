import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { t } = useTranslation('common');
  const { pathname } = useLocation();

  const items = [
    { key: 'home', path: '/' },
    { key: 'classes', path: '/dashboard' },
    { key: 'quizzes', path: '/quiz' },
    { key: 'random', path: '/random' },
    { key: 'contact', path: '/contact' },
  ];

  return (
    <nav className="hidden md:flex sticky top-14 z-40 border-b bg-blue-900">
      <div className="container flex gap-6 px-4 h-12 items-center justify-center">
        {items.map((item) => (
          <Link
            key={item.key}
            to={item.path}
            className={cn(
              'text-sm font-medium',
              pathname === item.path ? 'text-indigo-300' : 'text-slate-100 hover:text-white',
            )}
          >
            {t(`navbar.${item.key}`)}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
