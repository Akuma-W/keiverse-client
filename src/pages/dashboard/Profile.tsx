import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AvatarFallback } from '@radix-ui/react-avatar';
import {
  BookOpen,
  Calendar,
  Camera,
  ChevronRight,
  Clock,
  Edit3,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Save,
  School,
  TrendingUp,
  User,
  X,
  Zap,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { cn, generateGradient } from '@/lib/utils';
import { fetchProfileThunk } from '@/features/auth/auth.slice';
import { fetchMyEnrollmentsThunk } from '@/features/enrollments/enrollments.slice';
import { fetchUserByIdThunk } from '@/features/users/users.slice';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { current, loading } = useAppSelector((s) => s.users);
  const { myEnrollments } = useAppSelector((s) => s.enrollments);

  const isMyProfile = useMemo(() => !id, [id]);
  const profileUser = isMyProfile ? user : current;
  const enrollments = isMyProfile ? myEnrollments : current?.enrollments;

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    school: '',
  });
  const [activeTab, setActiveTab] = useState<'info' | 'progress'>('info');

  useEffect(() => {
    if (!id) {
      dispatch(fetchProfileThunk());
    } else {
      dispatch(fetchUserByIdThunk(Number(id)));
    }
  }, [id, isMyProfile, dispatch]);

  useEffect(() => {
    if (!profileUser) return;
    setForm({
      fullName: profileUser.fullName,
      email: profileUser.email ?? '',
      phone: profileUser.phone ?? '',
      school: profileUser.school ?? '',
    });
  }, [profileUser]);

  useEffect(() => {
    if (isMyProfile) {
      dispatch(fetchMyEnrollmentsThunk());
    }
  }, [dispatch, isMyProfile]);
  console.log('myEnrollments =', myEnrollments);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // await dispatch(
    //   updateProfile({
    //     id: user.id,
    //     data: form,
    //   }),
    // );

    setIsEditing(false);
  };

  if (loading || !profileUser) {
    return <div className="p-10 text-center text-slate-500">Đang tải hồ sơ…</div>;
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Profile Header */}
      <div className="relative h-48 md:h-64 rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-100/30">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-900 via-indigo-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

        <div className="absolute bottom-2 left-8 md:left-12 flex items-end gap-6 z-10">
          <div className="relative group">
            <div className="h-32 w-32 md:h-44 md:w-44 rounded-[2.5rem] bg-white p-2 shadow-2xl">
              <Avatar className="h-full w-full rounded-4xl items-center flex">
                {profileUser.imageUrl ? (
                  <AvatarImage
                    src={profileUser.imageUrl}
                    alt={profileUser.fullName}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="bg-indigo-50 text-indigo-600 font-black text-4xl w-full h-full flex items-center justify-center">
                  {profileUser.fullName
                    .split(' ')
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join(''.toUpperCase())}
                </AvatarFallback>
              </Avatar>
            </div>
            <button className="absolute bottom-4 right-4 h-10 w-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform border-4 border-white">
              <Camera className="h-5 w-5" />
            </button>
          </div>
          <div className="pb-20 hidden md:block">
            <h1 className="text-4xl font-heading font-black text-white tracking-tight drop-shadow-md">
              {profileUser.username}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/10 flex items-center gap-2">
                {profileUser.role.name === 'student' ? (
                  <GraduationCap className="h-3 w-3" />
                ) : (
                  <School className="h-3 w-3" />
                )}
                {profileUser.role.name === 'student' && 'Học viên'}
                {profileUser.role.name === 'teacher' && 'Giảng viên'}
                {profileUser.role.name === 'admin' && 'Admin'}
              </span>
              <span className="text-indigo-100 text-sm font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Tham gia:{' '}
                {new Date(profileUser.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex gap-2 p-1.5 bg-slate-100 rounded-3xl w-fit">
            <button
              onClick={() => setActiveTab('info')}
              className={cn(
                'px-6 py-2.5 rounded-2xl text-xs font-bold transition-all',
                activeTab === 'info'
                  ? 'bg-white text-indigo-600 shadow-md'
                  : 'text-slate-500 hover:text-slate-900',
              )}
            >
              Thông tin cá nhân
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={cn(
                'px-6 py-2.5 rounded-2xl text-xs font-bold transition-all',
                activeTab === 'progress'
                  ? 'bg-white text-indigo-600 shadow-md'
                  : 'text-slate-500 hover:text-slate-900',
              )}
            >
              {profileUser.role.name === 'student' ? 'Tiến độ học tập' : 'Lớp học quản lý'}
            </button>
          </div>

          {activeTab === 'info' && (
            <Card className="rounded-[2.5rem] border-slate-100 bg-white p-8 md:p-10 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-slate-900">Chi tiết tài khoản</h2>
                {isMyProfile && (
                  <Button
                    variant={isEditing ? 'ghost' : 'outline'}
                    className="rounded-xl"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <X className="h-4 w-4 mr-2" />
                    ) : (
                      <Edit3 className="h-4 w-4 mr-2" />
                    )}
                    {isEditing ? 'Hủy bỏ' : 'Chỉnh sửa'}
                  </Button>
                )}
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                      Họ và tên
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                      <Input
                        disabled={!isEditing}
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="pl-12 h-14 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                      <Input
                        disabled={!isEditing}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="pl-12 h-14 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                      <Input
                        disabled={!isEditing}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="pl-12 h-14 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                      Địa chỉ
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                      <Input
                        disabled={!isEditing}
                        value={form.school}
                        onChange={(e) => setForm({ ...form, school: e.target.value })}
                        className="pl-12 h-14 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-4 animate-in slide-in-from-top-2">
                    <Button
                      type="submit"
                      variant="brand"
                      className="w-full h-14 rounded-2xl shadow-xl shadow-indigo-100 font-black uppercase tracking-widest text-xs"
                      onClick={handleSave}
                    >
                      <Save className="h-4 w-4 mr-2" /> Lưu thay đổi ngay
                    </Button>
                  </div>
                )}
              </form>
            </Card>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              {profileUser.role.name === 'student' ? (
                <div className="space-y-6">
                  <Card className="rounded-[2.5rem] border-slate-100 bg-white p-8 shadow-xl">
                    <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-indigo-500" /> Kết quả theo môn học
                    </h3>
                    <div className="space-y-8">
                      {enrollments &&
                        enrollments.map((item, i) => (
                          <div key={i} className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-black text-slate-800">
                                {item.classroom.title}
                              </span>
                              <span className="text-xs font-black text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full">
                                Mô tả: {item.classroom.description}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="rounded-4xl border-slate-100 bg-white p-6 shadow-lg flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-inner">
                        <Zap className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          Hoàn thành Quiz
                        </p>
                        <p className="text-xl font-black text-slate-900">42 / 50</p>
                      </div>
                    </Card>
                    <Card className="rounded-4xl border-slate-100 bg-white p-6 shadow-lg flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          Chuyên cần
                        </p>
                        <p className="text-xl font-black text-slate-900">95.4%</p>
                      </div>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrollments &&
                    enrollments.map((item) => (
                      <Card
                        key={item.id}
                        onClick={() => navigate(`/class/${item.id}`)}
                        className="rounded-4xl border-slate-100 bg-white p-6 hover:border-indigo-200 transition-all group cursor-pointer shadow-lg shadow-indigo-100/5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-5">
                            <div
                              className={cn(
                                'h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg',
                                generateGradient(item.classroom.title),
                              )}
                            >
                              <BookOpen className="h-6 w-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                                  {item.classroom.code}
                                </span>
                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase rounded border border-emerald-100">
                                  {item.status}
                                </span>
                              </div>
                              <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                                {item.classroom.title}
                              </h4>
                              <p className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-2">
                                <User className="h-3 w-3" />
                                {item.classroom._count?.enrollments ?? 0} học viên đã tham gia
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  <Button
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                    className="w-full h-14 rounded-2xl border-dashed border-2 border-slate-200 text-slate-400 font-bold hover:border-indigo-200 hover:text-indigo-600 transition-all"
                  >
                    <Plus className="h-5 w-5 mr-2" /> Tạo lớp học mới
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Plus = ({ className, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default Profile;
