import {
  ChevronLeft,
  Circle,
  ImageIcon,
  Info,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  UserPlus,
  Users,
  Video,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
  isMe: boolean;
  avatar?: string;
}

interface ChatRoom {
  id: string;
  name: string;
  type: 'group' | 'dm';
  lastMessage: string;
  time: string;
  unreadCount: number;
  online?: boolean;
  avatar?: string;
  members?: number;
}

const MOCK_CHATS: ChatRoom[] = [
  {
    id: '1',
    name: 'Nhóm Sáng Tạo (UX/UI)',
    type: 'group',
    lastMessage: 'Alex: Bản thiết kế đã hoàn thiện...',
    time: '2m',
    unreadCount: 2,
    avatar: 'NS',
    members: 12,
  },
  {
    id: '2',
    name: 'Lớp Intro to UX Design',
    type: 'group',
    lastMessage: 'Thầy Alexander: Bài tập tuần này...',
    time: '1h',
    unreadCount: 0,
    avatar: 'UX',
    members: 45,
  },
  {
    id: '3',
    name: 'Bảo Trân',
    type: 'dm',
    lastMessage: 'Cảm ơn ông nhé!',
    time: '3h',
    unreadCount: 0,
    online: true,
  },
  {
    id: '4',
    name: 'Thầy Alexander',
    type: 'dm',
    lastMessage: 'Em check lại mail nhé.',
    time: '5h',
    unreadCount: 1,
    online: false,
  },
  {
    id: '5',
    name: 'Cường Phạm',
    type: 'dm',
    lastMessage: 'Mai học mấy giờ nhỉ?',
    time: '1d',
    unreadCount: 0,
    online: true,
  },
];

const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 's1',
    senderName: 'Bảo Trân',
    text: 'Chào Alex, ông đã xem qua phần Wireframe tôi vừa gửi chưa?',
    time: '10:30 AM',
    isMe: false,
  },
  {
    id: 'm2',
    senderId: 'me',
    senderName: 'Alex Nguyen',
    text: 'Tôi vừa xem xong, nhìn chung khá ổn rồi đấy. Tuy nhiên phần Navigation nên làm nổi bật hơn chút.',
    time: '10:32 AM',
    isMe: true,
  },
  {
    id: 'm3',
    senderId: 's1',
    senderName: 'Bảo Trân',
    text: 'Ừm, để tôi thử chỉnh lại sang dạng Tab bar xem sao.',
    time: '10:33 AM',
    isMe: false,
  },
  {
    id: 'm4',
    senderId: 'me',
    senderName: 'Alex Nguyen',
    text: 'Ok, có gì cứ nhắn tôi nhé!',
    time: '10:35 AM',
    isMe: true,
  },
  {
    id: 'm5',
    senderId: 's1',
    senderName: 'Bảo Trân',
    text: 'Cảm ơn ông nhé!',
    time: '10:36 AM',
    isMe: false,
  },
];

const Chat = () => {
  const [activeChat, setActiveChat] = useState<ChatRoom>(MOCK_CHATS[0]);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'Alex Nguyen',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl h-full flex gap-6 overflow-hidden">
        {/* Sidebar: Chat List */}
        <Card className="w-full lg:w-[350px] rounded-[2.5rem] border-none shadow-2xl bg-white flex flex-col overflow-hidden shrink-0">
          <div className="p-6 border-b border-slate-50 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-black text-slate-900">Tin nhắn</h2>
              <Button variant="ghost" size="icon" className="rounded-xl bg-slate-50">
                <UserPlus className="h-5 w-5 text-indigo-600" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Tìm kiếm hội thoại..."
                className="pl-10 h-11 rounded-xl bg-slate-50 border-none text-sm focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-2">
            {MOCK_CHATS.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(
              (chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-3xl transition-all group relative mb-1',
                    activeChat.id === chat.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                      : 'hover:bg-slate-50 text-slate-600',
                  )}
                >
                  <div className="relative shrink-0">
                    <div
                      className={cn(
                        'h-12 w-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm',
                        activeChat.id === chat.id ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600',
                      )}
                    >
                      {chat.avatar ||
                        chat.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                    </div>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-center mb-0.5">
                      <p
                        className={cn(
                          'text-sm font-black truncate',
                          activeChat.id === chat.id ? 'text-white' : 'text-slate-900',
                        )}
                      >
                        {chat.name}
                      </p>
                      <span
                        className={cn(
                          'text-[9px] font-bold uppercase',
                          activeChat.id === chat.id ? 'text-white/60' : 'text-slate-400',
                        )}
                      >
                        {chat.time}
                      </span>
                    </div>
                    <p
                      className={cn(
                        'text-xs truncate',
                        activeChat.id === chat.id ? 'text-white/80' : 'text-slate-500',
                      )}
                    >
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unreadCount > 0 && activeChat.id !== chat.id && (
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 h-5 w-5 bg-indigo-500 text-white rounded-full flex items-center justify-center text-[9px] font-black border-2 border-white">
                      {chat.unreadCount}
                    </div>
                  )}
                </button>
              ),
            )}
          </div>
        </Card>

        {/* Main Window: Conversation */}
        <Card className="flex-1 rounded-[3rem] border-none shadow-2xl bg-white flex flex-col overflow-hidden relative">
          {/* Header */}
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 -ml-2 text-slate-400 hover:bg-slate-50 rounded-full">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
                  {activeChat.avatar ||
                    activeChat.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                </div>
                {activeChat.online && (
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">{activeChat.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {activeChat.type === 'group' ? (
                      <Users className="h-3 w-3" />
                    ) : (
                      <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500" />
                    )}
                    {activeChat.type === 'group'
                      ? `${activeChat.members} thành viên`
                      : activeChat.online
                        ? 'Đang trực tuyến'
                        : 'Ngoại tuyến'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
              >
                <Phone className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
              >
                <Video className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
              >
                <Info className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-slate-50/30"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex flex-col max-w-[75%] animate-in fade-in slide-in-from-bottom-2',
                  msg.isMe ? 'ml-auto items-end' : 'items-start',
                )}
              >
                {!msg.isMe && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-6 w-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-[8px] font-black">
                      {msg.senderName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                      {msg.senderName}
                    </span>
                  </div>
                )}
                <div
                  className={cn(
                    'px-6 py-4 rounded-[1.8rem] text-sm font-medium shadow-sm relative group',
                    msg.isMe
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none',
                  )}
                >
                  {msg.text}
                  <div
                    className={cn(
                      'absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2',
                      msg.isMe ? '-left-12' : '-right-12',
                    )}
                  >
                    <button className="p-1.5 bg-white border rounded-lg text-slate-400 hover:text-indigo-600 shadow-sm">
                      <Smile className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1.5 px-1">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-50">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-4 bg-slate-50 rounded-4xl px-6 py-3 border border-slate-100 shadow-inner group focus-within:bg-white focus-within:border-indigo-200 transition-all"
            >
              <button
                type="button"
                className="text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <Smile className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <ImageIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <div className="h-6 w-px bg-slate-200 mx-1"></div>
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-slate-900"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={cn(
                  'h-11 w-11 rounded-2xl flex items-center justify-center transition-all shadow-lg',
                  inputText.trim()
                    ? 'bg-indigo-600 text-white shadow-indigo-200 hover:scale-110 active:scale-95'
                    : 'bg-slate-200 text-slate-400',
                )}
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Chat;
