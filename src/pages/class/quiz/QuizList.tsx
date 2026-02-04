import { Activity, BookOpen, School, TrendingUp, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const QuizList = () => {
  const stats = [
    {
      label: 'Tổng Học Viên',
      value: '1,284',
      grow: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Tổng Giảng Viên',
      value: '86',
      grow: '+4%',
      icon: School,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Lớp Học Hoạt Động',
      value: '342',
      grow: '+8%',
      icon: BookOpen,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      label: 'Lượt Chơi Quiz',
      value: '12,405',
      grow: '+25%',
      icon: Zap,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-black text-slate-900 flex items-center gap-3">
            <Activity className="h-8 w-8 text-indigo-600" />
            Bảng điều khiển Admin
          </h1>
          <p className="text-slate-500 font-medium">
            Chào mừng trở lại! Đây là tổng quan về hệ sinh thái KEIVerse.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="rounded-4xl border-slate-100 shadow-xl shadow-indigo-100/20 bg-white"
          >
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={cn(
                    'h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner',
                    stat.bg,
                    stat.color,
                  )}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1 text-emerald-500 font-black text-xs">
                  <TrendingUp className="h-3 w-3" /> {stat.grow}
                </div>
              </div>
              <h3 className="text-3xl font-heading font-black text-slate-900">{stat.value}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Simulation */}
        <Card className="lg:col-span-2 rounded-[2.5rem] border-slate-100 bg-white shadow-2xl shadow-indigo-100/10">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">Lưu lượng truy cập hệ thống</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase">
                Tháng này
              </span>
            </div>
          </div>
          <CardContent className="p-10">
            <div className="h-64 flex items-end gap-3 justify-between">
              {[40, 70, 45, 90, 65, 85, 100, 75, 55, 95, 80, 60].map((h, i) => (
                <div key={i} className="flex-1 group relative">
                  <div
                    className="w-full bg-indigo-500/20 group-hover:bg-indigo-500 rounded-t-lg transition-all duration-500"
                    style={{ height: `${h}%` }}
                  ></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {h * 120} views
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="rounded-[2.5rem] border-slate-100 bg-white shadow-2xl shadow-indigo-100/10 overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <h3 className="text-lg font-black text-slate-900">Hoạt động gần đây</h3>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {[
                {
                  user: 'Admin System',
                  action: 'Cập nhật hệ thống v2.4',
                  time: '10 phút trước',
                  color: 'text-indigo-600',
                },
                {
                  user: 'Prof. Anderson',
                  action: 'Tạo lớp học mới: Advanced UI',
                  time: '1 giờ trước',
                  color: 'text-emerald-600',
                },
                {
                  user: 'Alex Nguyen',
                  action: 'Hoàn thành Quiz 05',
                  time: '3 giờ trước',
                  color: 'text-amber-600',
                },
                {
                  user: 'System Bot',
                  action: 'Backup dữ liệu hàng ngày',
                  time: '5 giờ trước',
                  color: 'text-slate-400',
                },
                {
                  user: 'Dr. Smith',
                  action: 'Duyệt 15 học viên mới',
                  time: '8 giờ trước',
                  color: 'text-blue-600',
                },
              ].map((act, i) => (
                <div
                  key={i}
                  className="p-6 hover:bg-slate-50 transition-colors flex items-start gap-4"
                >
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full mt-2 shrink-0',
                      i === 0 ? 'bg-indigo-500' : 'bg-slate-200',
                    )}
                  ></div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{act.action}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">
                      {act.user} • {act.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 hover:bg-indigo-50 transition-all border-t border-slate-50">
              Xem tất cả nhật ký
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizList;
