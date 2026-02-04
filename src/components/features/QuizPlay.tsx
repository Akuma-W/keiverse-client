import { ArrowRight, HelpCircle, Timer, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface QuizPlayProps {
  onExit?: () => void;
}

export const QuizPlay: React.FC<QuizPlayProps> = ({ onExit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(10);
  const [score, setScore] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  const handleNext = useCallback(() => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(15);
      setSelectedOption(null);
      setScore((prev) => prev + (selectedOption !== null ? 150 : 0));
    } else {
      setIsFinishing(true);
      // Simulate submission
      setTimeout(() => {
        navigate(`/quiz/${id || 'q1'}/result`);
      }, 1500);
    }
  }, [currentQuestion, totalQuestions, selectedOption, navigate, id]);

  // Fake timer logic
  useEffect(() => {
    if (isFinishing) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestion, isFinishing, handleNext]);

  const options = ['Components', 'Hooks', 'State Management', 'Virtual DOM'];

  if (isFinishing) {
    return (
      <div className="fixed inset-0 z-100 bg-slate-900 flex flex-col items-center justify-center text-white text-center p-8">
        <div className="h-24 w-24 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-3xl font-heading font-black mb-4">Đang đồng bộ kết quả...</h2>
        <p className="text-slate-400 font-medium max-w-sm">
          Hệ thống đang ghi lại thành tích của bạn vào vũ trụ KEIVerse. Vui lòng đợi trong giây lát.
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col text-white">
      {/* Background Aura */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600 rounded-full blur-[150px] animate-pulse"></div>
      </div>

      {/* Quiz Header */}
      <div className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-slate-900/80 backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-6">
          <button
            onClick={() => (onExit ? onExit() : navigate(-1))}
            className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="h-8 w-px bg-white/10"></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
              Câu hỏi hiện tại
            </p>
            <p className="font-heading font-black text-xl">
              {currentQuestion} / {totalQuestions}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-rose-500/20 px-5 py-2 rounded-2xl border border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            <Timer className="h-5 w-5 text-rose-400" />
            <span className="font-heading font-black text-xl tabular-nums text-rose-400">
              {timeLeft}s
            </span>
          </div>
          <div className="h-10 w-px bg-white/10 hidden sm:block"></div>
          <div className="text-right hidden sm:block">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">
              Điểm hiện tại
            </p>
            <p className="font-heading font-black text-xl text-amber-400">
              {score.toLocaleString()} pts
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-white/5 relative z-10">
        <div
          className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-1000"
          style={{ width: `${(timeLeft / 15) * 100}%` }}
        ></div>
      </div>

      {/* Main Stage */}
      <main className="flex-1 container mx-auto px-6 flex flex-col justify-center items-center py-12 relative z-10">
        <div className="max-w-4xl w-full space-y-16">
          <div className="text-center space-y-6">
            <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-inner">
              <HelpCircle className="h-8 w-8 text-indigo-400" />
            </div>
            <h2 className="text-2xl md:text-5xl font-heading font-black leading-tight text-white tracking-tight drop-shadow-2xl">
              Tính năng nào của React cho phép bạn sử dụng State và các tính năng khác mà không cần
              viết Class?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={cn(
                  'h-24 md:h-32 rounded-4xl text-lg md:text-2xl font-black transition-all transform relative group border-2 overflow-hidden',
                  selectedOption === idx
                    ? 'bg-indigo-600 border-indigo-400 shadow-[0_15px_40px_-10px_rgba(79,70,229,0.5)] scale-[1.02] text-white'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white/80 hover:text-white',
                )}
              >
                <span className="absolute left-6 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-sm font-black group-hover:bg-white/20 transition-all">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="ml-12">{opt}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="h-24 bg-slate-900/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-center px-8 relative z-10">
        <div className="max-w-4xl w-full flex justify-between items-center">
          <p className="text-xs font-bold text-slate-500 hidden sm:block">
            Vui lòng chọn 1 phương án để tiếp tục.
          </p>
          <Button
            variant="brand"
            size="lg"
            className="rounded-2xl h-14 px-12 text-sm font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/20 group ml-auto"
            disabled={selectedOption === null}
            onClick={handleNext}
          >
            {currentQuestion === totalQuestions ? 'Hoàn thành bài thi' : 'Tiếp tục câu hỏi'}
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};
