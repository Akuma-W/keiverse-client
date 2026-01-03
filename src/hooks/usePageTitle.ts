import { useEffect } from 'react';
import { useWebsiteConfig } from './useWebsiteConfig';

interface Props {
  title?: string;
  description?: string;
}

export const usePageTitle = ({ title, description }: Props = {}) => {
  const { name, slogan } = useWebsiteConfig();

  useEffect(() => {
    const prevTitle = document.title;
    const fullTitle = `${name} | ${title ?? slogan}`;
    document.title = fullTitle;

    const metaName = 'description';
    let meta = document.querySelector(`meta[name="${metaName}"]`) as HTMLMetaElement | null;
    const prevMetaContent = meta?.content;

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = metaName;
      document.head.appendChild(meta);
    }
    meta.content = description ?? slogan;

    return () => {
      // restore previous values
      document.title = prevTitle;
      if (meta) {
        if (typeof prevMetaContent === 'string') meta.content = prevMetaContent;
        else meta.remove();
      }
    };
  }, [title, description, name, slogan]);
};
