import { BookOpen, ChevronRight, Edit3, Filter, Plus, Search, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { cn, generateGradient } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const ClassManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const classes = [
    {
      id: '101',
      title: 'Introduction to UX Design',
      code: 'UX-101',
      teacher: 'Prof. Alexander',
      students: 24,
      status: 'Active',
    },
    {
      id: '102',
      title: 'Advanced React Patterns',
      code: 'DEV-202',
      teacher: 'Dr. John Smith',
      students: 18,
      status: 'Active',
    },
    {
      id: '103',
      title: 'Cosmic History',
      code: 'HIS-300',
      teacher: 'Ms. Frizzle',
      students: 42,
      status: 'Active',
    },
    {
      id: '104',
      title: 'Data Structures',
      code: 'CS-101',
      teacher: 'Mr. Robot',
      students: 30,
      status: 'Active',
    },
    {
      id: '105',
      title: 'Modern JavaScript',
      code: 'JS-2024',
      teacher: 'Prof. J. Querry',
      students: 15,
      status: 'Ended',
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-slate-900 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            Quản lý Lớp học
          </h1>
          <p className="text-slate-500 font-medium">
            Theo dõi và quản trị toàn bộ {classes.length} lớp học trên hệ thống.
          </p>
        </div>
        <Button variant="brand" className="rounded-2xl h-12 px-8 shadow-xl">
          <Plus className="h-5 w-5 mr-2" /> Tạo lớp mới
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Tìm kiếm lớp học, mã lớp, giảng viên..."
            className="pl-12 h-14 rounded-2xl bg-white border-slate-100 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-14 px-6 rounded-2xl bg-white border-slate-100">
          <Filter className="h-5 w-5 mr-2" /> Lọc
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {classes.map((cls) => (
          <Card
            key={cls.id}
            className="rounded-4xl border-slate-100 bg-white hover:border-indigo-200 hover:shadow-2xl transition-all group overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center">
              <div
                className={cn(
                  'md:w-48 h-32 md:h-auto flex items-center justify-center text-white',
                  generateGradient(cls.title),
                )}
              >
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">
                    {cls.code}
                  </p>
                  <BookOpen className="h-8 w-8 mx-auto mt-1" />
                </div>
              </div>
              <div className="flex-1 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cls.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                    Giảng viên: <span className="text-slate-900 font-bold">{cls.teacher}</span>
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <Users className="h-3.5 w-3.5" /> {cls.students} học viên
                    </span>
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest',
                        cls.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-slate-50 text-slate-400 border border-slate-100',
                      )}
                    >
                      {cls.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl h-12 w-12 hover:bg-slate-100"
                  >
                    <Edit3 className="h-5 w-5 text-slate-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl h-12 w-12 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                  <Button variant="brand" className="rounded-xl h-12 px-6 shadow-none">
                    Quản lý <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClassManagement;
