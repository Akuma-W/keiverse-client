import { Activity, BookOpen, LayoutDashboard, Shield, Users, Zap } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  isOpen: boolean;
  activePath: string;
  onNavigate: (path: string) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen, activePath, onNavigate }) => {
  // const pinnedClasses = [
  //   { id: '101', name: 'Intro to UX Design', color: 'bg-blue-500' },
  //   { id: '103', name: 'Cosmic History', color: 'bg-purple-500' },
  // ];

  const adminLinks = [
    { name: 'Tổng quan Admin', path: '/admin', icon: Activity },
    { name: 'Quản lý Lớp học', path: '/admin/classes', icon: BookOpen },
    { name: 'Hệ thống Quiz', path: '/admin/quizzes', icon: Zap },
    { name: 'Người dùng', path: '/admin/users', icon: Users },
  ];

  // const urgentAssignments = [
  //   { id: 'a1', title: 'Wireframe Design', deadline: '2h còn lại', urgent: true },
  //   { id: 'a2', title: 'React Hooks Quiz', deadline: 'Ngày mai', urgent: false },
  // ];

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-72 transform border-r bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto pb-10 pt-10',
        !isOpen && '-translate-x-full',
      )}
    >
      <div className="p-5 space-y-8">
        {/* Main Nav */}
        <div>
          <button
            onClick={() => onNavigate('/dashboard')}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all',
              activePath === '/dashboard'
                ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            Bàn làm việc
          </button>
        </div>

        {/* Admin Console Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">
            <Shield className="h-3 w-3" />
            Admin Console
          </div>
          <div className="space-y-1">
            {adminLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                  activePath === link.path
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700',
                )}
              >
                <link.icon
                  className={cn(
                    'h-4 w-4',
                    activePath === link.path ? 'text-indigo-600' : 'text-slate-400',
                  )}
                />
                <span className="truncate">{link.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pinned Classes Section */}
        {/* <div className="space-y-3">
          <div className="flex items-center gap-2 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Pin className="h-3 w-3" />
            Lớp học đã ghim
          </div>
          <div className="space-y-1">
            {pinnedClasses.map((cls) => (
              <button
                key={cls.id}
                onClick={() => onNavigate(`/class/${cls.id}`)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all group",
                  activePath.includes(cls.id) ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                )}
              >
                <div className={cn("h-2 w-2 rounded-full shrink-0 transition-transform group-hover:scale-150", cls.color)}></div>
                <span className="truncate">{cls.name}</span>
              </button>
            ))}
          </div>
        </div> */}

        {/* Urgent Assignments Section */}
        {/* <div className="space-y-3">
          <div className="flex items-center gap-2 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Clock className="h-3 w-3" />
            Bài tập cần làm ngay
          </div>
          <div className="space-y-2">
            {urgentAssignments.map((task) => (
              <div
                key={task.id}
                className="mx-2 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-2">
                  {task.urgent ? (
                    <AlertCircle className="h-4 w-4 text-rose-500 mt-0.5 shrink-0 animate-pulse" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-slate-300 mt-0.5 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                      {task.title}
                    </p>
                    <p className={cn("text-[10px] mt-0.5 font-medium", task.urgent ? "text-rose-500" : "text-slate-400")}>
                      {task.deadline}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </aside>
  );
};
