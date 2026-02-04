import {
  Calendar,
  Edit3,
  GraduationCap,
  Mail,
  School,
  Search,
  ShieldCheck,
  UserX,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const UserManagement = () => {
  const users = [
    {
      id: '1',
      name: 'Alex Nguyen',
      email: 'alex@keiverse.io',
      role: 'student',
      status: 'Active',
      joined: '10/01/2024',
    },
    {
      id: '2',
      name: 'Prof. Anderson',
      email: 'anderson@edu.vn',
      role: 'teacher',
      status: 'Active',
      joined: '05/01/2024',
    },
    {
      id: '3',
      name: 'Dr. Smith',
      email: 'smith@edu.vn',
      role: 'teacher',
      status: 'Active',
      joined: '12/01/2024',
    },
    {
      id: '4',
      name: 'System Admin',
      email: 'admin@keiverse.io',
      role: 'admin',
      status: 'Active',
      joined: '01/01/2024',
    },
    {
      id: '5',
      name: 'John Doe',
      email: 'john@gmail.com',
      role: 'student',
      status: 'Banned',
      joined: '15/02/2024',
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-black text-slate-900 flex items-center gap-3">
            <Users className="h-8 w-8 text-indigo-600" />
            Người dùng & Phân quyền
          </h1>
          <p className="text-slate-500 font-medium">
            Quản lý danh tính và quyền truy cập của {users.length} thành viên.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Tìm học viên, giáo viên..."
            className="pl-12 h-14 rounded-2xl bg-white border-slate-100 shadow-sm"
          />
        </div>
      </div>

      <Card className="rounded-[2.5rem] border-slate-100 bg-white shadow-2xl shadow-indigo-100/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Người dùng
                </th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Vai trò
                </th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Trạng thái
                </th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Ngày tham gia
                </th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'h-12 w-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm',
                          user.role === 'admin'
                            ? 'bg-rose-500 text-white'
                            : user.role === 'teacher'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-indigo-500 text-white',
                        )}
                      >
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Mail className="h-3 w-3" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      {user.role === 'admin' && <ShieldCheck className="h-4 w-4 text-rose-500" />}
                      {user.role === 'teacher' && <School className="h-4 w-4 text-emerald-500" />}
                      {user.role === 'student' && (
                        <GraduationCap className="h-4 w-4 text-indigo-500" />
                      )}
                      <span className="text-xs font-bold text-slate-600 capitalize">
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest',
                        user.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-rose-50 text-rose-600 border border-rose-100',
                      )}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" /> {user.joined}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl hover:bg-slate-100"
                      >
                        {/* Added missing Edit3 import from lucide-react */}
                        <Edit3 className="h-4 w-4 text-slate-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl hover:bg-rose-50 text-rose-500"
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default UserManagement;
