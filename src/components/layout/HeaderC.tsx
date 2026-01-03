import { useState } from 'react';
import ChatDrawer from '../drawers/ChatDrawer';
import MobileMenuDrawer from '../drawers/MobileMenuDrawer';
import NotificationDrawer from '../drawers/NotificationDrawer';
import Navbar from './Navbar';

type DrawerType = 'chat' | 'notifications' | 'mobile' | null;

type HeaderProps = {
  isLoggedIn: boolean;
};

const HeaderC = ({ isLoggedIn }: HeaderProps) => {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onOpenDrawer={setActiveDrawer} />

      <NotificationDrawer
        open={activeDrawer === 'notifications'}
        onClose={() => setActiveDrawer(null)}
      />

      <ChatDrawer open={activeDrawer === 'chat'} onClose={() => setActiveDrawer(null)} />

      <MobileMenuDrawer open={activeDrawer === 'mobile'} onClose={() => setActiveDrawer(null)} />
    </>
  );
};

export default HeaderC;
