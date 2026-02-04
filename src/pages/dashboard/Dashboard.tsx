import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { BookOpen, Hash, LayoutGrid, Plus, QrCode, Save, Sparkles, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import type { Classroom } from '@/types/classrooms.type';
import { classroomsService } from '@/services/classrooms.service';
import { createClassroomThunk } from '@/features/classrooms/classrooms.slice';
import {
  fetchMyEnrollmentsThunk,
  joinEnrollmentThunk,
} from '@/features/enrollments/enrollments.slice';
import { useAuth } from '@/hooks/useAuth';
import ClassGrid from '@/components/classes/ClassGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Dashboard = () => {
  const { user, userRole } = useAuth();
  const dispatch = useAppDispatch();
  const { myEnrollments } = useAppSelector((s) => s.enrollments);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    termStart: new Date().toISOString().slice(0, 10),
    termEnd: new Date().toISOString().slice(0, 10),
  });
  const [joinCode, setJoinCode] = useState('');
  const [previewClass, setPreviewClass] = useState<Classroom | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMyEnrollmentsThunk());
  }, [dispatch]);

  const handlePreviewClass = React.useCallback(async () => {
    if (!joinCode) return;

    try {
      setPreviewLoading(true);
      setPreviewError(null);

      const res = await classroomsService.getByCode(joinCode);
      setPreviewClass(res.data);
    } catch {
      setPreviewClass(null);
      setPreviewError('Không tìm thấy lớp học với mã này');
    } finally {
      setPreviewLoading(false);
    }
  }, [joinCode]);

  useEffect(() => {
    if (joinCode.length < 6) {
      setPreviewClass(null);
      setPreviewError(null);
      return;
    }

    const timeout = setTimeout(() => {
      handlePreviewClass();
    }, 500);

    return () => clearTimeout(timeout);
  }, [handlePreviewClass, joinCode]);

  const { managedClasses, joinedClasses, pendingClasses } = useMemo(() => {
    const managed: Classroom[] = [];
    const joined: Classroom[] = [];
    const pending: Classroom[] = [];

    myEnrollments.forEach((e) => {
      if (e.status === 'pending') {
        pending.push(e.classroom);
      } else if (e.status === 'approved') {
        if (e.roleIn === 'teacher') {
          managed.push(e.classroom);
        }
        if (e.roleIn === 'student') {
          joined.push(e.classroom);
        }
      }
    });

    return {
      managedClasses: managed,
      joinedClasses: joined,
      pendingClasses: pending,
    };
  }, [myEnrollments]);

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await dispatch(
      createClassroomThunk({
        title: form.title,
        description: form.description,
        termStart: new Date(form.termStart).toISOString(),
        termEnd: new Date(form.termEnd).toISOString(),
      }),
    ).unwrap();

    dispatch(fetchMyEnrollmentsThunk());
    setIsCreateModalOpen(false);
    setForm({ title: '', description: '', termStart: '', termEnd: '' });
  };

  const handleJoinClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode || !previewClass || !user) return;

    await dispatch(
      joinEnrollmentThunk({
        userId: user.id,
        classId: previewClass.id,
      }),
    ).unwrap();
    dispatch(fetchMyEnrollmentsThunk());

    // reset
    setIsJoinModalOpen(false);
    setJoinCode('');
    setPreviewClass(null);
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
    setJoinCode('');
    setPreviewClass(null);
    setPreviewError(null);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header with Title & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-heading font-black text-slate-900 tracking-tight flex items-center gap-3">
            <LayoutGrid className="h-8 w-8 text-indigo-600" />
            Bàn làm việc
          </h1>
          <p className="text-slate-500 font-medium">
            Bạn đang quản lý{' '}
            <span className="text-indigo-600 font-bold">{managedClasses.length}</span> lớp · Tham
            gia <span className="text-indigo-600 font-bold">{joinedClasses.length}</span> lớp · Chờ
            duyệt <span className="text-amber-500 font-bold">{pendingClasses.length}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-2xl h-12 px-6 border-slate-200 hover:bg-blue-500 font-bold text-slate-600"
            onClick={() => setIsJoinModalOpen(true)}
          >
            Tham gia lớp
          </Button>
          {userRole === 'teacher' && (
            <Button
              variant="brand"
              className="rounded-2xl h-12 px-6 shadow-xl shadow-indigo-200"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="h-5 w-5 mr-2" />
              Tạo lớp mới
            </Button>
          )}
        </div>
      </div>

      {/* Class Grid */}
      {/* {classes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
          <div className="h-20 w-20 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
            <BookOpen className="h-10 w-10" />
          </div>

          <h3 className="text-xl font-black text-slate-900 mb-2">Bạn chưa tham gia lớp học nào</h3>

          <p className="text-slate-500 max-w-md mb-6">
            {userRole === 'student'
              ? 'Hãy tham gia lớp học bằng mã lớp do giảng viên cung cấp.'
              : 'Hãy tạo lớp học đầu tiên để bắt đầu quản lý lớp của bạn.'}
          </p>
        </div>
      )} */}
      {/* Lớp quản lý */}
      {userRole === 'teacher' && (
        <section className="space-y-4">
          <h2 className="text-lg font-black text-slate-900">Lớp bạn quản lý</h2>

          {managedClasses.length === 0 ? (
            <p className="text-slate-500 italic">Bạn chưa tạo lớp học nào.</p>
          ) : (
            <ClassGrid title="" classes={managedClasses} emptyText="" />
          )}
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-lg font-black text-slate-900">Lớp bạn đang tham gia</h2>

        {joinedClasses.length === 0 ? (
          <p className="text-slate-500 italic">Bạn chưa tham gia lớp học nào.</p>
        ) : (
          <ClassGrid title="" classes={joinedClasses} emptyText="" />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-black text-amber-600">Lớp đang chờ duyệt</h2>

        {pendingClasses.length === 0 ? (
          <p className="text-slate-500 italic">Hiện không có lớp nào đang chờ duyệt.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pendingClasses.map((cls) => (
              <Card key={cls.id} className="p-4 border-amber-200 bg-amber-50 rounded-3xl">
                <h3 className="font-black text-slate-900">{cls.title}</h3>
                <p className="text-sm text-slate-600">
                  Giảng viên: <b>{cls.teacher.fullName}</b>
                </p>
                <p className="text-xs text-amber-600 font-bold mt-2">
                  ⏳ Đang chờ giảng viên duyệt
                </p>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Join Class Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsJoinModalOpen(false)}
          />
          <Card className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden border-none">
            <CardHeader className="p-8 border-b border-slate-50 flex items-center justify-between bg-indigo-50/20">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Hash className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-heading font-black text-slate-900">
                  Tham gia lớp học
                </CardTitle>
              </div>
              <Button variant="ghost" size="icon" onClick={closeJoinModal} className="rounded-full">
                <X className="h-5 w-5 text-slate-400" />
              </Button>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex items-center gap-3 text-indigo-600">
                  <Sparkles className="h-5 w-5" />
                  <p className="text-xs font-black uppercase tracking-widest">Cách thức tham gia</p>
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Nhập mã lớp được cung cấp bởi giảng viên của bạn.
                </p>
              </div>

              <form onSubmit={handleJoinClass} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 flex items-center gap-2">
                    Mã lớp học
                  </label>
                  <Input
                    required
                    placeholder="VD: 01ABCD"
                    className="h-14 rounded-2xl bg-slate-50 border-slate-100 text-slate-900 focus:bg-white transition-all font-mono font-black text-lg uppercase tracking-widest"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                  />
                </div>
                {/* Preview */}
                {previewLoading && (
                  <p className="text-sm text-slate-500">Đang kiểm tra mã lớp...</p>
                )}

                {previewError && <p className="text-sm text-rose-500 font-bold">{previewError}</p>}

                {!joinCode && (
                  <p className="text-xs text-slate-400 italic">
                    Nhập mã lớp để xem trước thông tin lớp học
                  </p>
                )}

                {previewClass && (
                  <div className="p-4 rounded-2xl border bg-slate-50 space-y-1">
                    <p className="font-black text-slate-900">{previewClass.title}</p>
                    <p className="text-sm text-slate-600">
                      Giảng viên: <b>{previewClass.teacher.fullName}</b>
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(previewClass.termStart).toLocaleDateString()} –{' '}
                      {new Date(previewClass.termEnd).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    variant="brand"
                    disabled={!previewClass || previewLoading}
                    className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100"
                  >
                    {previewLoading ? 'Đang kiểm tra...' : 'Gửi yêu cầu tham gia'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-14 w-14 rounded-2xl border-slate-100 bg-white"
                  >
                    <QrCode className="h-6 w-6 text-indigo-600" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create Class Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsCreateModalOpen(false)}
          />
          <Card className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden border-none">
            <CardHeader className="p-8 border-b border-slate-50 flex items-center justify-between bg-indigo-50/30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-heading font-black text-slate-900">
                  Tạo lớp học mới
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCreateModalOpen(false)}
                className="rounded-full"
              >
                <X className="h-5 w-5 text-slate-400" />
              </Button>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleCreateClass} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 flex items-center gap-2">
                    <BookOpen className="h-3 w-3" /> Tên lớp học
                  </label>
                  <Input
                    required
                    placeholder="VD: Thiết kế trải nghiệm người dùng..."
                    className="h-14 rounded-2xl bg-slate-50 border-slate-100 text-slate-900 focus:bg-white transition-all font-medium"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                <Textarea
                  required
                  placeholder="Mô tả lớp học"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    required
                    type="date"
                    value={form.termStart}
                    onChange={(e) => setForm({ ...form, termStart: e.target.value })}
                  />
                  <Input
                    required
                    type="date"
                    value={form.termEnd}
                    onChange={(e) => setForm({ ...form, termEnd: e.target.value })}
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1 h-14 rounded-2xl font-bold text-slate-500"
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    type="submit"
                    variant="brand"
                    onClick={handleCreateClass}
                    className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Khởi tạo lớp học
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
