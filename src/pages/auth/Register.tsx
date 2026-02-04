import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Loader,
  Lock,
  Mail,
  Phone,
  School,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { registerThunk, verifyOtpThunk } from '@/features/auth/auth.slice';
import Logo from '@/components/logo/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const ROLE_MAP = {
  student: 3,
  teacher: 2,
} as const;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isOtpStep, loading } = useAppSelector((s) => s.auth);

  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');
  const OTP_EXPIRE = 300;
  const [secondsLeft, setSecondsLeft] = useState(OTP_EXPIRE);

  useEffect(() => {
    if (isOtpStep) {
      setSecondsLeft(OTP_EXPIRE);
    }
  }, [isOtpStep]);

  useEffect(() => {
    if (!isOtpStep || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOtpStep, secondsLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email && !formData.phone) {
      toast.error('Vui lòng nhập Email hoặc Số điện thoại');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }

    const res = await dispatch(
      registerThunk({
        username: formData.username,
        fullName: formData.fullName,
        password: formData.password,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        roleId: ROLE_MAP[role],
      }),
    );

    if (registerThunk.rejected.match(res)) {
      toast.error(res.payload as string);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (secondsLeft <= 0) {
      toast.error('Mã OTP đã hết hạn');
      return;
    }

    const res = await dispatch(
      verifyOtpThunk({
        otp,
        username: formData.username,
      }),
    );

    if (verifyOtpThunk.fulfilled.match(res)) {
      toast.success('Đăng ký thành công');
      navigate('/login');
    } else {
      toast.error(res.payload as string);
    }
  };

  if (isOtpStep) {
    return (
      <div className="w-full flex justify-center">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 via-white to-blue-50/50"></div>
        <Card className="w-full max-w-md relative z-10 border-none bg-white shadow-2xl rounded-[2.5rem]">
          <CardHeader className="text-center pb-8 pt-10">
            <div className="h-20 w-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-500 shadow-inner">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <CardTitle className="text-3xl font-heading font-black text-slate-900">
              Xác nhận OTP
            </CardTitle>
            <p className="text-sm text-slate-500 mt-3 font-medium px-6 leading-relaxed">
              Mã OTP đã được gửi về{' '}
              <span className="text-indigo-600 font-bold">{formData.email || formData.phone}</span>
              . <br />
              Vui lòng nhập mã để hoàn tất.
            </p>
          </CardHeader>
          <CardContent className="px-10 pb-12">
            <form onSubmit={handleVerifyOtp} className="space-y-8">
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                placeholder="Nhập mã OTP"
                className="text-center text-2xl tracking-widest font-black h-14 rounded-2xl"
                disabled={secondsLeft <= 0}
                required
              />
              <p className="text-xs text-slate-500 text-center font-bold">
                Mã OTP hết hạn sau <span className="text-rose-500">{formatTime(secondsLeft)}</span>
              </p>
              <Button
                type="submit"
                variant="brand"
                className="w-full h-14 text-lg rounded-2xl shadow-xl shadow-indigo-100 font-bold"
                disabled={loading || secondsLeft <= 0}
              >
                {loading ? 'Đang xác nhận...' : 'Xác nhận đăng ký'}
              </Button>
              {secondsLeft <= 0 && (
                <button
                  type="button"
                  className="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-widest"
                  onClick={handleRegister}
                >
                  Gửi lại mã OTP
                </button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="absolute inset-0 bg-linear-to-bl from-indigo-50/50 via-white to-purple-50/50 opacity-90"></div>

      <Card className="w-full max-w-xl relative z-10 border-none bg-white shadow-2xl rounded-[3rem] overflow-hidden">
        <CardHeader className="text-center pb-6 pt-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-50 rounded-3xl shadow-inner">
              <Logo size="md" withText={false} />
            </div>
          </div>
          <CardTitle className="text-3xl font-heading font-black text-slate-900 mb-2">
            Gia nhập KEIVerse
          </CardTitle>
          <p className="text-sm text-slate-500 font-medium">
            Bắt đầu hành trình tại vũ trụ giáo dục tương tác
          </p>
        </CardHeader>
        <CardContent className="px-10 pb-12">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-2">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={cn(
                  'rounded-2xl p-5 border-2 flex flex-col items-center gap-2 transition-all group',
                  role === 'student'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-lg shadow-indigo-100/50'
                    : 'bg-white border-slate-100 text-slate-400 grayscale',
                )}
              >
                <GraduationCap
                  className={cn(
                    'h-8 w-8 transition-transform group-hover:scale-110',
                    role === 'student' ? 'text-indigo-600' : 'text-slate-300',
                  )}
                />
                <span className="font-black text-[10px] uppercase tracking-[0.2em]">Học viên</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={cn(
                  'rounded-2xl p-5 border-2 flex flex-col items-center gap-2 transition-all group',
                  role === 'teacher'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-lg shadow-emerald-100/50'
                    : 'bg-white border-slate-100 text-slate-400 grayscale',
                )}
              >
                <School
                  className={cn(
                    'h-8 w-8 transition-transform group-hover:scale-110',
                    role === 'teacher' ? 'text-emerald-600' : 'text-slate-300',
                  )}
                />
                <span className="font-black text-[10px] uppercase tracking-[0.2em]">
                  Giảng viên
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                  <Input
                    required
                    placeholder="john_doe"
                    className="pl-12 bg-slate-50/50 border-slate-100 text-slate-900 rounded-2xl h-12"
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                  <Input
                    required
                    placeholder="John Doe"
                    className="pl-12 bg-slate-50/50 border-slate-100 text-slate-900 rounded-2xl h-12"
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                  <Input
                    type="email"
                    placeholder="email@domain.com"
                    className="pl-12 bg-slate-50/50 border-slate-100 text-slate-900 rounded-2xl h-12"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                  <Input
                    placeholder="09xx xxx xxx"
                    className="pl-12 bg-slate-50/50 border-slate-100 text-slate-900 rounded-2xl h-12"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                  <Input
                    required
                    type="password"
                    placeholder="••••••••"
                    className="pl-12 bg-slate-50/50 border-slate-100 text-slate-900 rounded-2xl h-12"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                  <Input
                    required
                    type="password"
                    placeholder="••••••••"
                    className="pl-12 bg-slate-50/50 border-slate-100 text-slate-900 rounded-2xl h-12"
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              variant="brand"
              className="w-full h-14 text-lg rounded-2xl shadow-xl shadow-indigo-100 mt-4 font-bold"
            >
              {loading ? (
                <>
                  <Loader className="ml-2 h-5 w-5" />
                  Đang tạo tài khoản...
                </>
              ) : (
                <>
                  <ArrowRight className="ml-2 h-5 w-5" />
                  Tạo tài khoản ngay
                </>
              )}
            </Button>
          </form>
          <div className="mt-8 text-center text-sm">
            <span className="text-slate-500 font-medium">Đã có tài khoản? </span>
            <button
              onClick={() => navigate('/login')}
              className="font-black text-indigo-600 hover:underline underline-offset-4 decoration-2"
            >
              Đăng nhập
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
