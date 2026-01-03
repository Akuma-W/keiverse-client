import { useTranslation } from 'react-i18next';
import Logo from '@/assets/images/logo.svg';

export const useWebsiteConfig = () => {
  const { t } = useTranslation('common');

  return {
    name: t('name'),
    slogan: t('slogan'),
    logo: Logo,
  };
};
