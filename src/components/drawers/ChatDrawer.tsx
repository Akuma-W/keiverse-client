import { MessageSquare, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DrawerProps } from './drawer-props.interface';

interface ChatGroup {
  id: string;
  name: string;
  lastMsg: string;
  time: string;
  unread: number;
  avatar: string;
}

const MOCK_CHAT_GROUPS: ChatGroup[] = [
  {
    id: 'g1',
    name: 'UX/UI Creative Group',
    lastMsg: 'Alex: Persona draft has been uploaded.',
    time: '2m',
    unread: 2,
    avatar: 'UX',
  },
  {
    id: 'g2',
    name: 'Intro to UX Design',
    lastMsg: 'Instructor: Deadline moved to Monday.',
    time: '1h',
    unread: 0,
    avatar: 'IU',
  },
];

const ChatDrawer = ({ open, onClose }: DrawerProps) => {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      )}

      <aside
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="flex items-center gap-2 font-black text-lg">
            <MessageSquare className="h-5 w-5 text-indigo-600" />
            Group Chat
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto p-2">
          {MOCK_CHAT_GROUPS.map((group) => (
            <div
              key={group.id}
              className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 cursor-pointer transition"
            >
              <div className="h-12 w-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">
                {group.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-black truncate">{group.name}</p>
                  <span className="text-[10px] text-slate-400">{group.time}</span>
                </div>

                <p
                  className={cn(
                    'text-xs truncate',
                    group.unread > 0 ? 'text-indigo-600 font-black' : 'text-slate-500',
                  )}
                >
                  {group.lastMsg}
                </p>
              </div>

              {group.unread > 0 && (
                <div className="h-5 w-5 rounded-full bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center">
                  {group.unread}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick input */}
        <div className="p-4 border-t bg-slate-50">
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2 border shadow-sm">
            <input
              placeholder="Send a quick message..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ChatDrawer;
