import { Bell, Menu, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ChatDrawer from '../drawers/ChatDrawer';
import NotificationDrawer from '../drawers/NotificationDrawer';
import Logo from '../logo/Logo';
import { Button } from '../ui/button';
import AvatarDropdown from './AvatarDropdown';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onOpenSidebar: () => void;
  isLoggedIn: boolean;
  showSign?: boolean;
}

const HeaderC = ({ onOpenSidebar, isLoggedIn, showSign = true }: HeaderProps) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [openNotif, setOpenNotif] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto h-14 flex items-center justify-between px-4">
          <Logo size="sm" withSlogan={window.innerWidth > 768} />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {showSign && (
              <div className="hidden md:flex items-center gap-2">
                {isLoggedIn ? (
                  <>
                    <button onClick={() => setOpenNotif(true)}>
                      <Bell />
                      <span className="absolute top-3 ml-1 h-2 w-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>
                    <button onClick={() => setOpenChat(true)}>
                      <MessageSquare />
                      <span className="absolute top-3 ml-1 h-2 w-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>
                    <AvatarDropdown />
                  </>
                ) : (
                  <>
                    <Button variant="ghost" onClick={() => navigate('/login')}>
                      {t('header.login')}
                    </Button>
                    <Button variant="brand" onClick={() => navigate('/register')}>
                      {t('header.register')}
                    </Button>
                  </>
                )}
              </div>
            )}
            <Button className="md:hidden" onClick={() => onOpenSidebar()}>
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      <NotificationDrawer open={openNotif} onClose={() => setOpenNotif(false)} />
      <ChatDrawer open={openChat} onClose={() => setOpenChat(false)} />
    </>
  );
};

export default HeaderC;
