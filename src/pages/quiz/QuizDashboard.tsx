import {
  AlertCircle,
  CheckCircle2,
  Edit3,
  Filter,
  HelpCircle,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  User,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const QuizDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const quizzes = [
    {
      id: 'q1',
      title: 'UX Fundamentals Check',
      category: 'UX Design',
      author: 'Prof. Alexander',
      questions: 20,
      status: 'Active',
      updatedAt: '12/03/2024',
    },
    {
      id: 'q2',
      title: 'React Hooks Mastery',
      category: 'Development',
      author: 'Dr. John Smith',
      questions: 15,
      status: 'Active',
      updatedAt: '10/03/2024',
    },
    {
      id: 'q3',
      title: 'Cosmic Trivia: Planets',
      category: 'History',
      author: 'Ms. Frizzle',
      questions: 30,
      status: 'Draft',
      updatedAt: '05/03/2024',
    },
    {
      id: 'q4',
      title: 'JavaScript Engine Basics',
      category: 'Development',
      author: 'Prof. J. Querry',
      questions: 10,
      status: 'Locked',
      updatedAt: '01/03/2024',
    },
  ];

  const filteredQuizzes = quizzes.filter(
    (q) =>
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-slate-900 flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-200">
              <Zap className="h-6 w-6" />
            </div>
            Quản lý Quiz
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Quản trị ngân hàng đề thi và phân quyền giảng viên.
          </p>
        </div>
        <Button
          variant="brand"
          className="rounded-2xl h-12 px-8 bg-indigo-600 shadow-indigo-100 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" /> Tạo Quiz mới
        </Button>
      </div>

      {/* Filter Area */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Tìm bài quiz, tên giáo viên..."
            className="pl-12 h-14 rounded-2xl bg-white border-slate-100 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-14 px-6 rounded-2xl bg-white border-slate-100">
          <Filter className="h-5 w-5 mr-2" /> Lọc theo bộ môn
        </Button>
      </div>

      {/* Quiz List Table/Simple Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="rounded-4xl border-slate-100 bg-white hover:border-indigo-200 hover:shadow-xl transition-all group overflow-hidden"
            >
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6 flex-1">
                  {/* Icon/Type */}
                  <div
                    className={cn(
                      'h-16 w-16 rounded-3xl shrink-0 flex items-center justify-center shadow-inner',
                      quiz.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-500'
                        : quiz.status === 'Draft'
                          ? 'bg-amber-50 text-amber-500'
                          : 'bg-slate-50 text-slate-400',
                    )}
                  >
                    <Zap className="h-8 w-8" />
                  </div>

                  {/* Title & Info */}
                  <div className="min-w-0">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {quiz.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <User className="h-3.5 w-3.5 text-indigo-400" /> {quiz.author}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <HelpCircle className="h-3.5 w-3.5 text-blue-400" /> {quiz.questions} câu
                        hỏi
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Cập nhật: {quiz.updatedAt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions & Status */}
                <div className="flex items-center gap-4 shrink-0">
                  <div
                    className={cn(
                      'px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border',
                      quiz.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : quiz.status === 'Draft'
                          ? 'bg-amber-50 text-amber-600 border-amber-100'
                          : 'bg-slate-50 text-slate-400 border-slate-100',
                    )}
                  >
                    {quiz.status === 'Active' && <CheckCircle2 className="h-3 w-3 inline mr-1" />}
                    {quiz.status === 'Draft' && <AlertCircle className="h-3 w-3 inline mr-1" />}
                    {quiz.status}
                  </div>

                  <div className="h-10 w-px bg-slate-100 mx-2 hidden md:block"></div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl h-11 w-11 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm border border-slate-50"
                    >
                      <Edit3 className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl h-11 w-11 hover:bg-rose-50 hover:text-rose-600 shadow-sm border border-slate-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl h-11 w-11 hover:bg-slate-100"
                    >
                      <MoreVertical className="h-5 w-5 text-slate-400" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="py-20 text-center space-y-4 bg-white border border-dashed border-slate-200 rounded-[3rem]">
            <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
              <Search className="h-10 w-10" />
            </div>
            <p className="text-slate-400 font-bold italic">
              Không tìm thấy bài Quiz nào phù hợp...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizDashboard;
