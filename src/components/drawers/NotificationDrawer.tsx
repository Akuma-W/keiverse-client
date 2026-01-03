import { Bell, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DrawerProps } from './drawer-props.interface';

const NotificationDrawer = ({ open, onClose }: DrawerProps) => {
  return (
    <div
      className={cn(
        'fixed top-0 right-0 h-full w-80 bg-white z-50 transition-transform',
        open ? 'translate-x-0' : 'translate-x-full',
      )}
    >
      <div className="p-4 border-b flex justify-between">
        <h3 className="font-black flex gap-2">
          <Bell /> Notifications
        </h3>
        <button onClick={onClose}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default NotificationDrawer;
