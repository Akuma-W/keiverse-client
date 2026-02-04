import {
  Award,
  CheckCircle2,
  Clock,
  Home,
  LayoutDashboard,
  RotateCcw,
  Share2,
  Sparkles,
  TrendingUp,
  Trophy,
  Zap,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const QuizResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock result data
  const result = {
    title: 'UX Fundamentals Check',
    score: 1850,
    maxScore: 2000,
    correctAnswers: 18,
    totalQuestions: 20,
    timeTaken: '12:45',
    accuracy: 90,
    rank: 4,
    totalParticipants: 1250,
    badges: ['Thần tốc', 'Chính xác cao', 'Top 5%'],
    pointsEarned: 250,
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 py-20 overflow-hidden relative">
      {/* Background Decorative Circles */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-[120px]"></div>

      <div className="max-w-4xl w-full space-y-8 animate-in zoom-in-95 duration-500 relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-2 border border-emerald-200">
            Bài thi đã hoàn tất!
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-slate-900 tracking-tight">
            Tuyệt vời, <span className="text-indigo-600">Alex!</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Bạn đã chinh phục thành công vũ trụ kiến thức này.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Score Card */}
          <Card className="lg:col-span-2 rounded-[3rem] border-none shadow-2xl bg-white overflow-hidden flex flex-col">
            <div className="p-10 bg-slate-900 text-white relative">
              <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-brand-dark to-purple-700 opacity-90"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200">
                    Tổng điểm đạt được
                  </p>
                  <h2 className="text-6xl md:text-8xl font-heading font-black tracking-tighter text-white">
                    {result.score}
                    <span className="text-2xl text-white/40 ml-2 font-black">
                      / {result.maxScore}
                    </span>
                  </h2>
                </div>
                <div className="h-32 w-32 md:h-44 md:w-44 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 flex flex-col items-center justify-center shadow-2xl">
                  <Trophy className="h-12 w-12 md:h-16 md:w-16 text-amber-400 mb-2 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                  <p className="text-[10px] font-black uppercase text-white/60 tracking-widest">
                    Hạng của bạn
                  </p>
                  <p className="text-2xl font-black text-white">#{result.rank}</p>
                </div>
              </div>
            </div>

            <CardContent className="p-10 bg-white flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-500 mb-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Chính xác
                  </span>
                </div>
                <p className="text-2xl font-black text-slate-900">{result.accuracy}%</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase">
                  {result.correctAnswers} / {result.totalQuestions} Câu
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-500 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Thời gian
                  </span>
                </div>
                <p className="text-2xl font-black text-slate-900">{result.timeTaken}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase">Trung bình 38s/câu</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-500 mb-1">
                  <Zap className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Tích lũy</span>
                </div>
                <p className="text-2xl font-black text-slate-900">+{result.pointsEarned}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase">Kinh nghiệm (XP)</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-purple-500 mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Xu hướng</span>
                </div>
                <p className="text-2xl font-black text-slate-900">Top 5%</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase">Vượt 1,180 bạn học</p>
              </div>
            </CardContent>
          </Card>

          {/* Right: Badges & Rewards */}
          <div className="space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white p-8 space-y-8 h-full">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" /> Huy hiệu mới
                </h3>
              </div>
              <div className="space-y-4">
                {result.badges.map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 group hover:bg-indigo-600 transition-all cursor-default"
                  >
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                      <Award className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-black text-indigo-900 group-hover:text-white transition-colors uppercase tracking-widest">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-slate-50 text-center">
                <p className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
                  Chia sẻ thành tích này
                </p>
                <div className="flex justify-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl h-12 w-12 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl h-12 w-12 bg-slate-50 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8">
          <Button
            variant="outline"
            className="rounded-2xl h-16 px-10 border-slate-200 text-slate-600 font-black uppercase text-xs tracking-widest bg-white shadow-xl hover:bg-slate-50"
            onClick={() => navigate('/dashboard')}
          >
            <Home className="h-4 w-4 mr-2" /> Về trang chủ
          </Button>
          <Button
            variant="brand"
            className="rounded-2xl h-16 px-12 font-black uppercase text-xs tracking-widest shadow-2xl shadow-indigo-100"
            onClick={() => navigate(`/quiz/${id}/play`)}
          >
            <RotateCcw className="h-4 w-4 mr-2" /> Thi lại ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
