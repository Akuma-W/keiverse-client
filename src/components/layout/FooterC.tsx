import { CONTACT, SOCIALS } from '@/config';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { JSX } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type FooterLink = {
  name: string;
  href: string;
  content?: string;
  icon?: JSX.Element;
};

type FooterSection = {
  name: string;
  links: FooterLink[];
};

const FooterC = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation('common');

  const quickLinks: FooterSection = {
    name: t('footer.quickLinks.name'),
    links: [
      { name: t('footer.quickLinks.home'), href: '/' },
      { name: t('footer.quickLinks.dashboard'), href: '/dashboard' },
      { name: t('footer.quickLinks.quiz'), href: '/quiz' },
      { name: t('footer.quickLinks.random'), href: '/random' },
    ],
  };

  const contactLinks: FooterSection = {
    name: t('footer.contact.name'),
    links: [
      { name: t('footer.contact.owner'), href: '/contact', content: CONTACT.owner },
      { name: t('footer.contact.email'), href: `mailto:${CONTACT.email}`, content: CONTACT.email },
      { name: t('footer.contact.phone'), href: `tel:${CONTACT.phone}`, content: CONTACT.phone },
      { name: t('footer.contact.address'), href: '/contact', content: CONTACT.address },
    ],
  };

  const socialLinks: FooterSection = {
    name: t('footer.socials.name'),
    links: [
      { name: 'Facebook', href: SOCIALS.facebook, icon: <Facebook size={16} /> },
      { name: 'Twitter', href: SOCIALS.twitter, icon: <Twitter size={16} /> },
      { name: 'LinkedIn', href: SOCIALS.linkedin, icon: <Linkedin size={16} /> },
      { name: 'Instagram', href: SOCIALS.instagram, icon: <Instagram size={16} /> },
    ],
  };

  return (
    <footer className="w-full bg-linear-to-b from-blue-900 to-blue-800 text-white pt-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 lg:gap-12 md:gap-4 p-6">
        {/* About Section */}
        <div>
          <h3 className="font-semibold text-lg text-center mb-3">{t('name')} LMS</h3>
          <p className="text-sm text-blue-100 leading-relaxed">{t('footer.about')}</p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="font-semibold text-lg text-center mb-3">{quickLinks.name}</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.links.map((link, idx) => (
              <li key={idx} className="hover:text-gray-400 transition">
                <Link to={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-semibold text-lg text-center mb-3">{contactLinks.name}</h3>
          <ul className="space-y-2 text-sm">
            {contactLinks.links.map((link, idx) => (
              <li key={idx} className="flex gap-2 items-start">
                <span className="font-medium text-blue-100 whitespace-nowrap min-w-[70px]">
                  {link.name}:
                </span>
                <a
                  href={link.href}
                  className="text-gray-200 hover:text-white transition break-all min-w-0"
                >
                  {link.content}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-lg mb-3">{socialLinks.name}</h3>
          <ul className="flex gap-4 mt-2">
            {socialLinks.links.map((link, idx) => (
              <Tooltip key={idx}>
                <TooltipTrigger asChild>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 transition shadow-md"
                  >
                    {link.icon}
                  </a>
                </TooltipTrigger>
                <TooltipContent>{link.name}</TooltipContent>
              </Tooltip>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyrights */}
      <div className="bg-gray-200 text-center text-sm text-blue-800 py-4">
        &#169; {year} {t('footer.copyright')}
      </div>
    </footer>
  );
};

export default FooterC;
