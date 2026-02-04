import {
  MessageSquare,
  Plus,
  RotateCcw,
  Shuffle,
  Sparkles,
  Trash2,
  Trophy,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Random = () => {
  const [mode, setMode] = useState<'student' | 'idea'>('student');
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [isPicking, setIsPicking] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleAddItem = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newItem.trim()) {
      setItems([newItem.trim(), ...(items || [])]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    if (items) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handlePickRandom = () => {
    if (items.length === 0) return;

    setIsPicking(true);
    setResult(null);

    // Cosmic pick animation delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * items.length);
      const picked = items[randomIndex];
      setResult(picked);
      setHistory([picked, ...history].slice(0, 5));
      setIsPicking(false);
    }, 2000);
  };

  const switchMode = (newMode: 'student' | 'idea') => {
    setMode(newMode);
    // setItems(newMode === 'student' ? MOCK_STUDENTS : []);
    setResult(null);
    setNewItem('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Column: Controls & Input */}
          <div className="lg:w-1/3 w-full space-y-8 top-32">
            <div className="space-y-4">
              <h1 className="text-3xl font-heading font-black text-slate-900 flex items-center gap-3">
                <Shuffle className="h-8 w-8 text-indigo-600" />
                Vòng quay May mắn
              </h1>
              <p className="text-slate-500 font-medium leading-relaxed">
                Chọn ngẫu nhiên học viên để phát biểu hoặc chọn một ý kiến sáng tạo từ danh sách của
                bạn.
              </p>
            </div>

            <div className="flex p-1 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <button
                onClick={() => switchMode('student')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all',
                  mode === 'student'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                    : 'text-slate-400 hover:text-slate-600',
                )}
              >
                <Users className="h-4 w-4" /> Học viên
              </button>
              <button
                onClick={() => switchMode('idea')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all',
                  mode === 'idea'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                    : 'text-slate-400 hover:text-slate-600',
                )}
              >
                <MessageSquare className="h-4 w-4" /> Ý kiến
              </button>
            </div>

            <Card className="rounded-4xl border-none shadow-xl bg-white overflow-hidden">
              <div className="p-6 border-b border-slate-50 bg-indigo-50/20">
                <h3 className="text-xs font-black uppercase tracking-widest text-indigo-900 flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Thêm {mode === 'student' ? 'học viên' : 'ý kiến'}
                </h3>
              </div>
              <CardContent className="p-6">
                <form onSubmit={handleAddItem} className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder={
                        mode === 'student' ? 'Tên học viên...' : 'Nhập ý kiến/đề xuất...'
                      }
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white"
                    />
                    <Button
                      type="submit"
                      variant="brand"
                      className="h-12 w-12 p-0 rounded-xl shrink-0"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Danh sách: {items.length} mục
                    </p>
                    <button
                      type="button"
                      onClick={() => setItems([])}
                      className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                    >
                      Xóa hết
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {history.length > 0 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Lịch sử vừa chọn
                </h3>
                <div className="space-y-2">
                  {history.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <div className="h-6 w-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black">
                        {i + 1}
                      </div>
                      <span className="text-xs font-bold text-slate-700 truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Stage */}
          <div className="flex-1 w-full space-y-8">
            <div className="relative aspect-video lg:aspect-auto lg:h-[500px] w-full bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex items-center justify-center">
              {/* Background Stars/Effects */}
              <div className="absolute inset-0 bg-linear-to-br from-indigo-950 via-brand-dark to-purple-950 opacity-50"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

              <div className="relative z-10 text-center space-y-8 p-12 w-full max-w-lg">
                {isPicking ? (
                  <div className="space-y-8 animate-in zoom-in duration-300">
                    <div className="h-32 w-32 md:h-44 md:w-44 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto relative flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-indigo-400 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-heading font-black text-white tracking-widest animate-pulse uppercase italic">
                        Đang tìm kiếm...
                      </h2>
                      <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest">
                        KEIVerse đang kết nối với tri thức
                      </p>
                    </div>
                  </div>
                ) : result ? (
                  <div className="space-y-8 animate-in zoom-in duration-500">
                    <div className="h-32 w-32 md:h-44 md:w-44 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(79,70,229,0.5)] border-4 border-white/20">
                      <Trophy className="h-16 w-16 text-white" />
                    </div>
                    <div className="space-y-4">
                      <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">
                        Người được chọn là
                      </p>
                      <h2 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tight drop-shadow-xl">
                        {result}
                      </h2>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handlePickRandom}
                      className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-900 font-black uppercase text-xs tracking-widest px-10 h-14"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" /> Chọn lại
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="h-32 w-32 md:h-44 md:w-44 bg-white/5 border-2 border-dashed border-white/20 rounded-[2.5rem] flex items-center justify-center mx-auto">
                      <Shuffle className="h-16 w-16 text-white/20" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-heading font-black text-white">
                        Sẵn sàng chọn {mode === 'student' ? 'học viên' : 'ý kiến'}?
                      </h2>
                      <p className="text-slate-400 font-medium">
                        Nhấn nút bên dưới để khởi động vòng quay ngẫu nhiên của KEIVerse.
                      </p>
                    </div>
                    <Button
                      variant="brand"
                      onClick={handlePickRandom}
                      disabled={items.length === 0}
                      className="rounded-2xl shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)] font-black uppercase text-sm tracking-widest px-12 h-16 group"
                    >
                      Bắt đầu ngay
                      <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* List Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Danh sách hiện tại
                </h3>
                <p className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {items.length} mục
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.length === 0 ? (
                  <div className="col-span-full py-12 text-center bg-white border border-dashed border-slate-200 rounded-4xl">
                    <p className="text-slate-400 font-bold italic text-sm">
                      Chưa có mục nào trong danh sách...
                    </p>
                  </div>
                ) : (
                  items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-8 w-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center font-black text-[10px] group-hover:bg-indigo-50 group-hover:text-indigo-600">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-bold text-slate-700 truncate">{item}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(idx)}
                        className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ArrowUpRight = ({ className, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M7 7h10v10M7 17L17 7" />
  </svg>
);

export default Random;
