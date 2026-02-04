import { UserCheck, UserMinus, UserPlus, Users2 } from 'lucide-react';
import React from 'react';
import type { Enrollment } from '@/types/enrollments.type';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/* -------------------------------------------------------------------------- */
/*                                   Props                                    */
/* -------------------------------------------------------------------------- */

interface ManagementTabProps {
  isTeacher: boolean;
  enrollments: Enrollment[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export const ManagementTab: React.FC<ManagementTabProps> = ({
  isTeacher,
  enrollments,
  onApprove,
  onReject,
}) => {
  if (!isTeacher) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm">
        Bạn không có quyền quản lý lớp học này
      </div>
    );
  }

  const pending = enrollments.filter((e) => e.status === 'pending');
  const approved = enrollments.filter((e) => e.status === 'approved' && e.roleIn === 'student');

  return (
    <div className="space-y-12 max-w-5xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-black text-slate-900">Quản lý lớp học</h2>
        <p className="text-sm text-slate-500 font-medium">
          Quản lý yêu cầu tham gia và danh sách học viên
        </p>
      </div>

      {/* Pending requests */}
      {pending.length > 0 && (
        <Card className="rounded-[2.5rem] border-amber-100 bg-amber-50/30 overflow-hidden">
          <CardHeader className="p-8 border-b border-amber-100 bg-amber-50 flex items-center gap-4">
            <div className="h-10 w-10 bg-amber-500 rounded-xl flex items-center justify-center text-white">
              <UserPlus className="h-5 w-5" />
            </div>
            <CardTitle className="font-black text-amber-900">
              Yêu cầu tham gia ({pending.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 divide-y divide-amber-100">
            {pending.map((e) => (
              <div
                key={e.id}
                className="p-6 flex items-center justify-between hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-black text-xs">
                    {e.user.fullName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-black text-amber-900">{e.user.fullName}</p>
                    <p className="text-[10px] text-amber-500 font-bold tracking-widest">
                      {e.user.email}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-rose-600 uppercase text-[10px]"
                    onClick={() => onReject(e.id)}
                  >
                    <UserMinus className="h-4 w-4 mr-2" />
                    Từ chối
                  </Button>
                  <Button
                    size="sm"
                    variant="brand"
                    className="bg-emerald-500 hover:bg-emerald-600 uppercase text-[10px]"
                    onClick={() => onApprove(e.id)}
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Duyệt
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Approved students */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-3 text-lg font-black text-slate-800 uppercase tracking-[0.2em]">
          <Users2 className="h-5 w-5 text-indigo-500" />
          Học viên đã tham gia ({approved.length})
        </h3>

        <Card className="rounded-[2.5rem] border-slate-100 bg-white overflow-hidden shadow-xl">
          <div className="divide-y divide-slate-50">
            {approved.map((e) => (
              <div key={e.id} className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs">
                  {e.user.fullName[0]}
                </div>
                <div>
                  <p className="font-black text-sm text-slate-900">{e.user.fullName}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    {e.user.email}
                  </p>
                </div>
              </div>
            ))}

            {approved.length === 0 && (
              <div className="p-10 text-center text-slate-400 text-sm">Chưa có học viên nào</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
