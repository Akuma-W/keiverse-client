import { Bell, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
}

const NotificationDrawer = ({ open, onClose }: Props) => {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}

      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-white transition-transform',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-bold">
            <Bell className="h-5 w-5" /> Thông báo
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-4 text-sm text-center text-slate-500">🔔 Bạn không có thông báo mới!</div>
      </div>
    </>
  );
};

export default NotificationDrawer;
