import {
  CheckCircle2,
  ChevronRight,
  Globe,
  LifeBuoy,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type FormState = 'idle' | 'submitting' | 'success';

const Contact = () => {
  const [formState, setFormState] = useState<FormState>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  const contactCards = [
    {
      icon: Mail,
      title: 'Email Hỗ trợ',
      value: 'keiverse41@gmail.com',
      desc: 'Chúng tôi phản hồi trong vòng 24h làm việc.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: Phone,
      title: 'Hotline',
      value: '+84 96 124 3758',
      desc: 'Thứ 2 - Thứ 6, 8:00 - 18:00.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      icon: MapPin,
      title: 'Văn phòng',
      value: 'TP. Hồ Chí Minh',
      desc: 'Phường Nhà Bè, TP. Hồ Chí Minh',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-sceen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-brand-dark to-purple-900" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]text-indigo-300 bg-white/10 border border-white/10 backdrop-blur-md">
            Liên hệ với chúng tôi
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tight">
            Kết nối với{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
              Vũ trụ KEIVerse
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-medium">
            Bạn có thắc mắc, góp ý hay cần hỗ trợ kỹ thuật? Đội ngũ KEIVerse luôn sẵn sàng lắng nghe
            và đồng hành cùng bạn.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactCards.map((card, idx) => (
              <Card
                key={idx}
                className="rounded-[2.5rem] border-slate-100 bg-white shadow-2xl shadow-indigo-100/20 hover:-translate-y-2 transition-transform p-8"
              >
                <div
                  className={cn(
                    'h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner',
                    card.bg,
                    card.color,
                  )}
                >
                  <card.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{card.title}</h3>
                <p className="text-indigo-600 font-bold mb-4">{card.value}</p>
                <p className="text-slate-500 text-sm font-medium">{card.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Contact Form */}
            <div className="lg:w-1/2 w-full">
              <Card className="rounded-[3rem] border-none shadow-2xl bg-white overflow-hidden">
                <div className="p-10 border-b border-slate-50 bg-indigo-50/20">
                  <h2 className="text-2xl font-heading font-black text-slate-900 flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-indigo-600" />
                    Gửi tin nhắn cho chúng tôi
                  </h2>
                </div>
                <CardContent className="p-10">
                  {formState === 'success' ? (
                    <div className="text-center py-10 space-y-6 animate-in zoom-in">
                      <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-900">Gửi thành công!</h3>
                        <p className="text-slate-500 font-medium">
                          Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setFormState('idle')}
                        className="rounded-xl"
                      >
                        Gửi tin nhắn khác
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                            Họ và tên
                          </label>
                          <Input
                            required
                            placeholder="VD: Nguyễn Văn A"
                            className="h-12 rounded-xl bg-slate-50 focus:bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                            Email
                          </label>
                          <Input
                            required
                            type="email"
                            placeholder="email@example.com"
                            className="h-12 rounded-xl bg-slate-50 focus:bg-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                          Chủ đề
                        </label>
                        <select className="w-full h-12 rounded-xl bg-slate-50 border border-slate-100 px-4 text-sm font-medium outline-none focus:border-indigo-500 transition-all">
                          <option>Hỗ trợ kỹ thuật</option>
                          <option>Góp ý tính năng</option>
                          <option>Hợp tác đào tạo</option>
                          <option>Khác</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                          Nội dung
                        </label>
                        <textarea
                          required
                          placeholder="Nhập nội dung tin nhắn..."
                          className="w-full min-h-[150px] rounded-2xl bg-slate-50 border border-slate-100 p-4 text-sm font-medium outline-none focus:border-indigo-500 focus:bg-white transition-all"
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="brand"
                        className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100"
                        disabled={formState === 'submitting'}
                      >
                        {formState === 'submitting' ? 'Đang gửi...' : 'Gửi tin nhắn liên hệ'}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar / Info */}
            <div className="lg:w-1/2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-heading font-black text-slate-900 leading-tight">
                  Chúng tôi luôn sẵn sàng <br /> hỗ trợ bạn{' '}
                  <span className="text-indigo-600">24/7</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  KEIVerse không chỉ là một nền tảng, mà là một cộng đồng học tập bền vững. Ý kiến
                  của bạn là động lực để chúng tôi hoàn thiện vũ trụ tri thức này mỗi ngày.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-5 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-inner">
                    <LifeBuoy className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">Trung tâm trợ giúp</h4>
                    <p className="text-sm text-slate-500 mt-1 font-medium">
                      Xem các câu hỏi thường gặp (FAQ) để được giải đáp ngay lập tức.
                    </p>
                    <button className="mt-3 text-indigo-600 font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all">
                      Truy cập FAQ <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">Cộng đồng KEIVerse</h4>
                    <p className="text-sm text-slate-500 mt-1 font-medium">
                      Tham gia diễn đàn chung để trao đổi kiến thức cùng hàng ngàn học viên khác.
                    </p>
                    <button className="mt-3 text-emerald-600 font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all">
                      Tham gia ngay <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Connections */}
              <div className="pt-6 space-y-4">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                  Theo dõi chúng tôi
                </p>
                <div className="flex gap-4">
                  {['Facebook', 'LinkedIn', 'Github', 'YouTube'].map((s) => (
                    <button
                      key={s}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
