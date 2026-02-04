import {
  ArrowUpRight,
  ChevronLeft,
  Clock,
  Edit3,
  MoreHorizontal,
  Reply,
  Save,
  Send,
  User,
  X,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const ForumDetail = () => {
  // const { classId, id } = useParams();
  const { classId } = useParams();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isTeacher = true;

  const [mockPost, setMockPost] = useState({
    title: 'Future of AI in UX Design',
    author: 'Alex Nguyen',
    isAnonymous: false,
    createdAt: '2 giờ trước',
    content:
      'Chào mọi người, mình vừa đọc xong một bài báo về việc AI đang tự động hóa quá trình tạo Wireframe từ các mô tả văn bản. Các bạn nghĩ sao về việc này?',
    parentPost: {
      id: 'p1',
      title: 'Xu hướng UI 2024',
      author: 'Prof. Anderson',
    },
    comments: [
      {
        id: 'c1',
        user: 'Dr. Smith',
        text: 'AI chỉ là công cụ hỗ trợ. UX vẫn cần sự thấu cảm.',
        role: 'Giảng viên',
        time: '1 giờ trước',
      },
      {
        id: 'c2',
        user: 'Ẩn danh',
        text: 'Mình cũng đồng quan điểm. AI có thể vẽ đẹp nhưng không biết giải thích "tại sao".',
        role: 'Học viên',
        time: '30 phút trước',
        isAnonymous: true,
      },
    ],
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white border border-slate-100 shadow-sm"
            onClick={() => navigate(`/class/${classId}`)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Discussion / Thread
            </p>
            <h1 className="text-2xl font-heading font-black text-slate-900">{mockPost.title}</h1>
          </div>
        </div>
        {isTeacher && (
          <Button
            variant="outline"
            className="rounded-xl border-slate-100 text-slate-500"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit3 className="h-4 w-4 mr-2" /> Chỉnh sửa
          </Button>
        )}
      </div>

      {mockPost.parentPost && (
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between group cursor-pointer hover:bg-indigo-100 transition-all">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-indigo-500">
              <Reply className="h-4 w-4 rotate-180" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400">
                Trả lời chủ đề
              </p>
              <p className="text-xs font-bold text-indigo-900">
                {mockPost.parentPost.title}{' '}
                <span className="text-indigo-400 font-medium">
                  bởi {mockPost.parentPost.author}
                </span>
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>
      )}

      <div className="space-y-6">
        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden bg-white">
          <CardContent className="p-8 md:p-10 space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-slate-50">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'h-12 w-12 rounded-2xl flex items-center justify-center font-black shadow-lg',
                    mockPost.isAnonymous
                      ? 'bg-slate-200 text-slate-500'
                      : 'bg-indigo-600 text-white',
                  )}
                >
                  {mockPost.isAnonymous ? (
                    <User className="h-6 w-6" />
                  ) : (
                    mockPost.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    {mockPost.isAnonymous ? 'Thành viên ẩn danh' : mockPost.author}
                  </h4>
                  <div className="flex items-center gap-3 mt-0.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <Clock className="h-3 w-3" /> {mockPost.createdAt}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-300 h-10 w-10">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed text-lg font-medium">
                {mockPost.content}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 pt-6">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">
            Tất cả thảo luận
          </h3>
          <div className="space-y-4">
            {mockPost.comments.map((comment, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md"
              >
                <div
                  className={cn(
                    'h-10 w-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0',
                    comment.isAnonymous
                      ? 'bg-slate-100 text-slate-400'
                      : 'bg-indigo-50 text-indigo-600',
                  )}
                >
                  {comment.isAnonymous ? (
                    <User className="h-4 w-4" />
                  ) : (
                    comment.user
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="text-sm font-bold text-slate-900">{comment.user}</h4>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                        {comment.time}
                      </span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-50 text-slate-400 border border-slate-100">
                      {comment.role}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {comment.text}
                  </p>
                  <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 flex items-center gap-1 mt-2">
                    <Reply className="h-3 w-3" /> Trả lời
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-8 bg-white/90 backdrop-blur-xl border border-slate-100 rounded-4xl p-4 shadow-2xl flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 font-bold text-xs">
              AN
            </div>
            <input
              placeholder="Tham gia thảo luận..."
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
            />
            <Button variant="brand" className="rounded-2xl h-11 px-6 shadow-xl shadow-indigo-200">
              <Send className="h-4 w-4 mr-2" /> Gửi phản hồi
            </Button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          />
          <Card className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-none">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-indigo-50/30">
              <h2 className="text-xl font-heading font-black text-slate-900">
                Chỉnh sửa thảo luận
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-full"
              >
                <X className="h-5 w-5 text-slate-400" />
              </Button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Tiêu đề</label>
                <Input
                  value={mockPost.title}
                  onChange={(e) => setMockPost({ ...mockPost, title: e.target.value })}
                  className="rounded-xl h-12 bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Nội dung</label>
                <textarea
                  value={mockPost.content}
                  onChange={(e) => setMockPost({ ...mockPost, content: e.target.value })}
                  className="w-full min-h-[150px] bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm outline-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="ghost"
                  className="flex-1 h-12 rounded-xl"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Hủy
                </Button>
                <Button
                  variant="brand"
                  className="flex-1 h-12 rounded-xl font-black shadow-indigo-100"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <Save className="h-4 w-4 mr-2" /> Lưu
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
export default ForumDetail;
