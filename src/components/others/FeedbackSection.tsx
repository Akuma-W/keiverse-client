import { Send, Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <section className="py-32 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-5xl font-heading font-black text-slate-900 leading-tight">
              Mọi góp ý của bạn <br />
              <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">
                Xây dựng
              </span>{' '}
              tương lai!
            </h2>
            <p className="text-slate-600 text-xl font-medium">
              Chúng tôi luôn trân trọng mọi phản hồi từ cộng đồng KEIVerse để không ngừng nâng cấp
              trải nghiệm tương tác.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-5xl font-black text-slate-900 tracking-tighter">5k+</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">
                  Phản hồi
                </p>
              </div>
              <div className="w-px h-16 bg-slate-200"></div>
              <div>
                <p className="text-5xl font-black text-indigo-600 tracking-tighter">4.9/5</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">
                  Đánh giá sao
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full max-w-xl">
            <Card className="bg-white border-none shadow-[0_32px_64px_-16px_rgba(79,70,229,0.15)] rounded-[4rem] overflow-hidden">
              {feedbackSubmitted ? (
                <CardContent className="p-20 text-center space-y-8 animate-in zoom-in duration-500">
                  <div className="h-24 w-24 bg-emerald-100 rounded-4xl flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
                    <Send className="h-12 w-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-slate-900">Tuyệt vời!</h3>
                    <p className="text-slate-500 font-medium">
                      Phản hồi của bạn đã được gửi đến vũ trụ KEIVerse.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setFeedbackSubmitted(false)}
                    className="rounded-2xl px-10 h-12"
                  >
                    Gửi thêm góp ý
                  </Button>
                </CardContent>
              ) : (
                <CardContent className="p-12 space-y-8">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFeedbackSubmitted(true);
                    }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        Họ và tên
                      </label>
                      <Input
                        required
                        placeholder="VD: Alex Nguyen..."
                        className="bg-slate-50 h-14 rounded-2xl border-none text-slate-900 focus:bg-white transition-all font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                          Vai trò
                        </label>
                        <select className="w-full bg-slate-50 border-none rounded-2xl px-4 h-14 text-sm font-bold text-slate-700 outline-none focus:bg-white transition-all">
                          <option value="student">Học viên</option>
                          <option value="teacher">Giảng viên</option>
                        </select>
                      </div>
                      <div className="space-y-2 text-center">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Đánh giá
                        </label>
                        <div className="flex items-center gap-1.5 justify-center h-14 bg-slate-50 rounded-2xl border-none">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              onClick={() => setRating(s)}
                              onMouseEnter={() => setHoverRating(s)}
                              onMouseLeave={() => setHoverRating(0)}
                              className={cn(
                                'h-6 w-6 cursor-pointer transition-all',
                                (hoverRating || rating) >= s
                                  ? 'text-amber-400 fill-amber-400 scale-110'
                                  : 'text-slate-300',
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        Lời nhắn của bạn
                      </label>
                      <textarea
                        required
                        placeholder="Bạn muốn KEIVerse cải thiện điều gì?"
                        className="w-full bg-slate-50 border-none rounded-4xl p-6 min-h-[140px] text-sm font-medium focus:bg-white outline-none transition-all shadow-inner"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="brand"
                      className="w-full h-16 rounded-3xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100"
                    >
                      Gửi phản hồi cho chúng tôi <Send className="ml-3 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
