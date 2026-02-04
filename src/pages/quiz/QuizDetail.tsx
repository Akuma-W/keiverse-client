import {
  Award,
  CheckCircle2,
  ChevronLeft,
  Clock,
  HelpCircle,
  Info,
  Play,
  ShieldAlert,
  Star,
  Trophy,
  Zap,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const QuizDetail = () => {
  const { classId, id } = useParams();
  const navigate = useNavigate();

  // Mock data for the quiz
  const quiz = {
    id: 'q1',
    title: 'UX Fundamentals Check',
    category: 'UX Design',
    description:
      'Bài kiểm tra này bao quát các kiến thức cơ bản về nguyên lý thiết kế trải nghiệm người dùng, Heuristic Evaluation và tâm lý học nhận thức trong thiết kế giao diện.',
    questionsCount: 20,
    durationMinutes: 15,
    maxPoints: 2000,
    attempts: 1250,
    difficulty: 'Trung bình',
    rules: [
      'Mỗi câu hỏi có 15 giây để trả lời.',
      'Điểm số được tính dựa trên tốc độ và độ chính xác.',
      'Không thể quay lại câu hỏi trước sau khi đã xác nhận.',
      'Hệ thống tự động nộp bài khi hết giờ.',
    ],
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500 max-w-5xl mx-auto">
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
            Classwork / Quiz
          </p>
          <h1 className="text-2xl font-heading font-black text-slate-900">{quiz.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden bg-white">
            <div className="h-48 bg-linear-to-br from-amber-400 to-orange-600 p-10 flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10 space-y-2">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                  {quiz.category}
                </span>
                <h2 className="text-3xl font-heading font-black text-white">{quiz.title}</h2>
              </div>
              <Zap className="h-32 w-32 text-white/20 absolute -right-4 -bottom-4 rotate-12" />
            </div>
            <CardContent className="p-10 space-y-10">
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-3">
                  <Info className="h-5 w-5 text-amber-500" /> Giới thiệu bài Quiz
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">{quiz.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <HelpCircle className="h-5 w-5 text-indigo-500 mb-2" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Câu hỏi
                  </p>
                  <p className="text-lg font-black text-slate-900">{quiz.questionsCount}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="h-5 w-5 text-rose-500 mb-2" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Thời gian
                  </p>
                  <p className="text-lg font-black text-slate-900">{quiz.durationMinutes} Phút</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Award className="h-5 w-5 text-amber-500 mb-2" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Độ khó
                  </p>
                  <p className="text-lg font-black text-slate-900">{quiz.difficulty}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Star className="h-5 w-5 text-emerald-500 mb-2" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Điểm tối đa
                  </p>
                  <p className="text-lg font-black text-slate-900">{quiz.maxPoints}</p>
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-50">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                  <ShieldAlert className="h-5 w-5 text-rose-500" /> Quy định bài thi
                </h3>
                <div className="space-y-3">
                  {quiz.rules.map((rule, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50/50 border border-slate-100 text-sm font-medium text-slate-600"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Action & Stats */}
        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-2xl bg-slate-900 p-8 space-y-8 text-center sticky top-24 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-400 to-orange-600"></div>
            <div className="space-y-4 relative z-10">
              <div className="h-20 w-20 bg-white/5 rounded-4xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                <Zap className="h-10 w-10 text-amber-400" />
              </div>
              <h3 className="text-xl font-black text-white">Sẵn sàng thử thách?</h3>
              <p className="text-slate-400 text-sm font-medium">
                Hãy chắc chắn rằng bạn có kết nối internet ổn định và không gian yên tĩnh.
              </p>
            </div>
            <Button
              variant="brand"
              className="w-full h-16 rounded-2xl bg-linear-to-r from-amber-500 to-orange-600 text-white font-black uppercase tracking-widest text-sm shadow-[0_15px_30px_-10px_rgba(245,158,11,0.5)] group"
              onClick={() => navigate(`/quiz/${id}/play`)}
            >
              Bắt đầu ngay
              <Play className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform fill-current" />
            </Button>
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/10">
              <div className="text-center">
                <p className="text-lg font-black text-white">{quiz.attempts.toLocaleString()}</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  Lượt tham gia
                </p>
              </div>
              <div className="h-8 w-px bg-white/10"></div>
              <div className="text-center">
                <p className="text-lg font-black text-white">4.9</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  Đánh giá sao
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-slate-100 bg-white p-8 shadow-xl overflow-hidden">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" /> BXH Lớp học
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Alex Nguyen', score: '1,950', avatar: 'AN', pos: 1 },
                { name: 'Cuong Pham', score: '1,820', avatar: 'CP', pos: 2 },
                { name: 'Bao Tran', score: '1,750', avatar: 'BT', pos: 3 },
              ].map((user) => (
                <div key={user.pos} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'h-8 w-8 rounded-lg flex items-center justify-center font-black text-[10px] text-white',
                        user.pos === 1
                          ? 'bg-amber-500'
                          : user.pos === 2
                            ? 'bg-slate-400'
                            : 'bg-orange-400',
                      )}
                    >
                      {user.avatar}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{user.name}</span>
                  </div>
                  <span className="text-xs font-black text-indigo-600">{user.score} pts</span>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard/results')}
              className="w-full mt-6 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600"
            >
              Xem tất cả
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
