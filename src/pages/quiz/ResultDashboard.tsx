import {
  BarChart3,
  CheckCircle2,
  Clock,
  Download,
  History,
  Search,
  Share2,
  Target,
  TrendingUp,
  Trophy,
  UserCheck,
  Users2,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const MOCK_QUIZZES = [
  { id: 'q1', title: 'UX Fundamentals Check', totalStudents: 45 },
  { id: 'q2', title: 'React Hooks Mastery', totalStudents: 38 },
  { id: 'q3', title: 'Typography Basics', totalStudents: 42 },
  { id: 'q4', title: 'Data Structures Quiz', totalStudents: 50 },
];

const MOCK_CLASS_RESULTS = [
  {
    id: 'r1',
    quizId: 'q1',
    studentName: 'Alex Nguyen',
    date: '15/03/2024',
    score: 1850,
    accuracy: 90,
    duration: '12:45',
    status: 'Passed',
  },
  {
    id: 'r2',
    quizId: 'q1',
    studentName: 'Bảo Trân',
    date: '15/03/2024',
    score: 1720,
    accuracy: 86,
    duration: '14:10',
    status: 'Passed',
  },
  {
    id: 'r3',
    quizId: 'q1',
    studentName: 'Cường Phạm',
    date: '14/03/2024',
    score: 1980,
    accuracy: 98,
    duration: '10:05',
    status: 'Passed',
  },
  {
    id: 'r4',
    quizId: 'q1',
    studentName: 'Diễm My',
    date: '14/03/2024',
    score: 1450,
    accuracy: 70,
    duration: '15:00',
    status: 'Passed',
  },
  {
    id: 'r5',
    quizId: 'q1',
    studentName: 'Khánh Lê',
    date: '13/03/2024',
    score: 620,
    accuracy: 35,
    duration: '15:00',
    status: 'Failed',
  },
  {
    id: 'r6',
    quizId: 'q2',
    studentName: 'Alex Nguyen',
    date: '12/03/2024',
    score: 1420,
    accuracy: 72,
    duration: '11:10',
    status: 'Passed',
  },
  {
    id: 'r7',
    quizId: 'q2',
    studentName: 'Minh Quân',
    date: '12/03/2024',
    score: 1680,
    accuracy: 84,
    duration: '13:45',
    status: 'Passed',
  },
];

export const ResultDashboard = () => {
  // const navigate = useNavigate();
  const [selectedQuizId, setSelectedQuizId] = useState<string>('q1');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedQuiz = MOCK_QUIZZES.find((q) => q.id === selectedQuizId);
  const filteredResults = MOCK_CLASS_RESULTS.filter(
    (r) =>
      r.quizId === selectedQuizId && r.studentName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate class-wide stats for the selected quiz
  const avgScore =
    filteredResults.length > 0
      ? Math.round(filteredResults.reduce((acc, r) => acc + r.score, 0) / filteredResults.length)
      : 0;
  const participationRate = selectedQuiz
    ? Math.round((filteredResults.length / selectedQuiz.totalStudents) * 100)
    : 0;
  const passCount = filteredResults.filter((r) => r.status === 'Passed').length;
  const passRate =
    filteredResults.length > 0 ? Math.round((passCount / filteredResults.length) * 100) : 0;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto">
      {/* Header Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-black text-slate-900 leading-none">
                Báo cáo Kết quả Lớp học
              </h1>
              <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-widest">
                Chế độ Giảng viên
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-[10px] font-black uppercase text-slate-400 ml-3 mr-1">
              Chọn Quiz:
            </span>
            <select
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(e.target.value)}
              className="bg-slate-50 border-none rounded-xl px-4 py-2.5 text-xs font-black text-indigo-600 outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer min-w-[200px]"
            >
              {MOCK_QUIZZES.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.title}
                </option>
              ))}
            </select>
          </div>
          <Button
            variant="outline"
            className="rounded-2xl h-12 px-6 border-slate-100 bg-white hover:bg-slate-50"
          >
            <Download className="h-4 w-4 mr-2" /> Xuất Báo Cáo
          </Button>
        </div>
      </div>

      {/* Class Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8 group hover:scale-[1.02] transition-all">
          <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-6 bg-indigo-50 text-indigo-600 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Target className="h-6 w-6" />
          </div>
          <p className="text-4xl font-heading font-black text-slate-900 tracking-tighter">
            {avgScore.toLocaleString()}
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">
            Điểm Trung Bình
          </p>
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8 group hover:scale-[1.02] transition-all">
          <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-6 bg-emerald-50 text-emerald-600 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <UserCheck className="h-6 w-6" />
          </div>
          <p className="text-4xl font-heading font-black text-slate-900 tracking-tighter">
            {passRate}%
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">
            Tỷ lệ đạt (Passed)
          </p>
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8 group hover:scale-[1.02] transition-all">
          <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-6 bg-amber-50 text-amber-600 shadow-inner group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Users2 className="h-6 w-6" />
          </div>
          <p className="text-4xl font-heading font-black text-slate-900 tracking-tighter">
            {participationRate}%
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">
            Tham gia: {filteredResults.length}/{selectedQuiz?.totalStudents}
          </p>
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8 group hover:scale-[1.02] transition-all">
          <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-6 bg-rose-50 text-rose-600 shadow-inner group-hover:bg-rose-600 group-hover:text-white transition-colors">
            <History className="h-6 w-6" />
          </div>
          <p className="text-4xl font-heading font-black text-slate-900 tracking-tighter">
            {filteredResults.length > 0
              ? filteredResults[0].date.split('/')[0] + '/' + filteredResults[0].date.split('/')[1]
              : '--'}
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">
            Cập nhật cuối
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Detailed Class Results Table */}
        <Card className="lg:col-span-2 rounded-[3rem] border-none shadow-2xl bg-white overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                <Users2 className="h-4 w-4 text-indigo-500" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Danh sách kết quả học viên</h3>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                placeholder="Tìm tên học viên..."
                className="pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-100 outline-none text-xs font-bold w-full md:w-64 focus:ring-2 focus:ring-indigo-100 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-50">
                  <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Học viên
                  </th>
                  <th className="px-6 py-5 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 text-center">
                    Chính xác
                  </th>
                  <th className="px-6 py-5 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 text-center">
                    Thời lượng
                  </th>
                  <th className="px-6 py-5 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 text-center">
                    Điểm số
                  </th>
                  <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 text-right">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item) => (
                    <tr key={item.id} className="hover:bg-indigo-50/30 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center font-black text-[10px] group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                            {item.studentName
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{item.studentName}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                              Ngày nộp: {item.date}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="text-xs font-black text-slate-700">
                            {item.accuracy}%
                          </span>
                          <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                'h-full rounded-full',
                                item.accuracy > 70 ? 'bg-emerald-500' : 'bg-rose-500',
                              )}
                              style={{ width: `${item.accuracy}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-600">
                          <Clock className="h-3 w-3" /> {item.duration}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center font-mono text-sm font-black text-indigo-600">
                        {item.score.toLocaleString()}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border',
                            item.status === 'Passed'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                              : 'bg-rose-50 text-rose-600 border-rose-100',
                          )}
                        >
                          {item.status === 'Passed' ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <XCircleIcon className="h-3 w-3" />
                          )}
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="space-y-4">
                        <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                          <Search className="h-10 w-10" />
                        </div>
                        <p className="text-slate-400 font-bold italic">
                          Không tìm thấy kết quả nào...
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quiz Analytics Insights */}
        <div className="space-y-6">
          <Card className="rounded-[3rem] border-none shadow-2xl bg-white p-8 space-y-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-2xl opacity-50"></div>

            <div className="relative z-10 space-y-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-indigo-600" /> Phân tích Lớp học
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Độ khó cảm nhận</span>
                    <span className="text-amber-500">Trung bình</span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Sự ổn định của lớp</span>
                    <span className="text-emerald-500">Cao</span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                  <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Zap className="h-4 w-4" />
                  </div>
                  <p className="text-[11px] font-bold text-indigo-900 leading-tight">
                    Gợi ý: Phần lớn học viên đang gặp khó khăn ở <strong>Câu hỏi số 12</strong>{' '}
                    (Nguyên lý Heuristic).
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-[3rem] border-none shadow-2xl bg-slate-900 p-8 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-indigo-900 to-purple-900 opacity-80 transition-opacity group-hover:opacity-100"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            <div className="relative z-10 space-y-8">
              <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
                <Trophy className="h-7 w-7 text-amber-400" />
              </div>
              <div className="space-y-3">
                <h4 className="text-2xl font-heading font-black">Top Học Viên</h4>
                <p className="text-indigo-100 text-sm font-medium leading-relaxed opacity-80">
                  Chúc mừng <strong>Cường Phạm</strong> đã đạt điểm số cao nhất lớp (
                  {MOCK_CLASS_RESULTS[2].score} pts) trong thời gian ngắn nhất!
                </p>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-slate-900 bg-indigo-100 flex items-center justify-center text-indigo-900 font-black text-[10px]"
                  >
                    {i === 1 ? 'CP' : i === 2 ? 'AN' : 'BT'}
                  </div>
                ))}
                <div className="h-10 w-10 rounded-full border-2 border-slate-900 bg-white/20 flex items-center justify-center text-[10px] font-black">
                  +42
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-indigo-600"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              className="flex-1 rounded-2xl bg-white border border-slate-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600"
            >
              Cài đặt hiển thị
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const XCircleIcon = ({ className, ...props }: any) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

export default ResultDashboard;
