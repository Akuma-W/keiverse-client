import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
import { useWebsiteConfig } from '@/hooks/useWebsiteConfig';
import { FooterC, HeaderC } from '@/components/layout';

const AuthLayout = () => {
  const { logo } = useWebsiteConfig();
  const { t } = useTranslation('common');

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 p-4">
      <HeaderC />
      <main className="flex-1 mx-auto max-w-7xl w-2/3 lg:w-1/3 my-5">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex flex-col items-center gap-2">
            <div>
              <Link to="/" className="text-lg font-bold text-primary">
                <img src={logo} alt={t('name')} className="h-24 w-40" />
              </Link>
            </div>
          </div>
        </div>
        <Outlet />
      </main>
      <FooterC />
    </div>
  );
};

export default AuthLayout;
