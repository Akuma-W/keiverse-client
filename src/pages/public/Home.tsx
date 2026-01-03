import * as Icons from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useWebsiteConfig } from '@/hooks/useWebsiteConfig';
import FeedbackSection from '@/components/others/FeedbackSection';
import HeroCarousel from '@/components/others/HeroCarousel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const BANNERS = [
  {
    tag: 'Connect Your Mind',
    title: 'KEIVerse: Vũ Trụ Giáo Dục Tương Tác',
    desc: 'Nền tảng kết nối giảng viên và học viên thông qua hệ sinh thái học tập số hiện đại.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    color: 'from-indigo-600 to-purple-600',
  },
  {
    tag: 'Smart Revision',
    title: 'Hệ Thống Quiz Ôn Tập Thông Minh',
    desc: 'Quiz được thiết kế tối ưu cho việc ghi nhớ và ôn tập hiệu quả.',
    image:
      'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1200',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    tag: 'Active Discussion',
    title: 'Thảo Luận & Tương Tác Sôi Nổi',
    desc: 'Không gian trao đổi trực tiếp giữa giảng viên và học viên.',
    image:
      'https://images.unsplash.com/photo-152202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    color: 'from-blue-600 to-indigo-500',
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    icon: Icons.UserPlus,
    title: 'Đăng ký',
    desc: 'Tạo tài khoản với vai trò Giảng viên hoặc Học viên.',
  },
  {
    icon: Icons.LinkIcon,
    title: 'Tham gia lớp',
    desc: 'Kết nối lớp học thông qua mã lớp hoặc lời mời.',
  },
  {
    icon: Icons.BookOpen,
    title: 'Học tập & Tương tác',
    desc: 'Tham gia bài giảng, quiz và thảo luận trực tiếp.',
  },
  {
    icon: Icons.TrendingUp,
    title: 'Theo dõi tiến độ',
    desc: 'Xem điểm số, nhận phản hồi và cải thiện kết quả.',
  },
];

const Home = () => {
  const { slogan } = useWebsiteConfig();
  const navigate = useNavigate();
  usePageTitle({ title: `${slogan}` });
  const { t } = useTranslation('home');

  const features = t('features.items', { returnObjects: true }) as {
    title: string;
    desc: string;
    icon: string;
    color: string;
  }[];

  const abouts = t('about.items', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen flex flex-col">
      <HeroCarousel banners={BANNERS} />

      {/* SLOGAN BAR */}
      <section className="bg-indigo-600 py-6 text-center text-white font-bold">"{slogan}"</section>

      {/* CORE FEATURES */}
      <section className="py-24 bg-slate-50">
        <div className="container text-center mb-16">
          <span className="text-indigo-600 font-bold uppercase text-sm">{t('features.tag')}</span>
          <h2 className="text-4xl font-heading font-bold">{t('features.title')}</h2>
        </div>

        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = Icons[f.icon as keyof typeof Icons] as React.ComponentType<{
              className: string;
            }>;
            return (
              <Card key={i} className="p-8 shadow-xl hover:-translate-y-2 transition">
                <div
                  className={cn(
                    'h-14 w-14 rounded-2xl text-white flex items-center justify-center mb-6',
                    f.color,
                  )}
                >
                  {Icon && <Icon className="h-7 w-7" />}
                </div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="text-slate-500 text-sm">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* IMAGE */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523240715181-01489bb2e40d?auto=format&fit=crop&q=80&w=900"
                alt="KEIVerse About"
                className="rounded-[2.5rem] shadow-2xl"
              />
            </div>

            {/* CONTENT */}
            <div className="space-y-6">
              <span className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                {t('about.tag')}
              </span>

              <h2 className="text-4xl font-heading font-bold text-slate-900 leading-tight">
                Thu hẹp khoảng cách <br />
                giữa <span className="text-indigo-600">Dạy</span> và{' '}
                <span className="text-indigo-600">Học</span>
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed">{t('about.title')}</p>

              <ul className="space-y-4">
                {abouts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Icons.CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                variant="secondary"
                className="rounded-xl px-10"
                onClick={() => navigate('/register')}
              >
                Tham gia KEIVerse
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          {/* HEADER */}
          <div className="text-center mb-16 space-y-4">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs">
              Hướng dẫn nhanh
            </span>
            <h2 className="text-3xl font-heading font-bold text-slate-900">
              Cách KEIVerse hoạt động
            </h2>
          </div>

          {/* STEPS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
            {/* LINE (desktop) */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-100 -z-10" />

            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-4">
                <div className="relative h-16 w-16 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center shadow-lg">
                  <step.icon className="h-7 w-7 text-indigo-600" />
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>

                <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeedbackSection />
    </div>
  );
};

export default Home;
