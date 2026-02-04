import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ArrowRight, Lock, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import React, { useState } from 'react';
import { loginThunk } from '@/features/auth/auth.slice';
import Logo from '@/components/logo/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({
    identifier: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      loginThunk({
        identifier: form.identifier,
        password: form.password,
      }),
    );

    if (loginThunk.fulfilled.match(result)) {
      toast.success('Đăng nhập thành công', {
        duration: 1000,
      });
      setTimeout(() => {
        if (user?.role.name === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 1000);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Card className="w-full max-w-md relative z-10 border-white bg-white/80 backdrop-blur-xl shadow-2xl shadow-indigo-100/50 rounded-[2.5rem] border-none">
        <CardHeader className="text-center pb-8 pt-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-50 rounded-3xl shadow-inner">
              <Logo size="md" withText={false} />
            </div>
          </div>
          <CardTitle className="text-3xl font-heading font-black text-slate-900">
            Chào mừng trở lại
          </CardTitle>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Đăng nhập để tiếp tục khám phá tri thức
          </p>
        </CardHeader>
        <CardContent className="px-10 pb-12">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1">
                Username / Email / SĐT
              </label>
              <div className="relative">
                <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                <Input
                  autoComplete="username"
                  required
                  placeholder="Tài khoản của bạn..."
                  value={form.identifier}
                  onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                  className="pl-12 bg-white border-slate-100 text-slate-900 h-14 rounded-2xl focus:ring-indigo-500 shadow-sm transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                  Mật khẩu
                </label>
                {/* <button
                  type="button"
                  className="text-[10px] text-indigo-400 hover:text-indigo-600 uppercase font-black transition-colors"
                >
                  Quên mật khẩu?
                </button> */}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                <Input
                  required
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="pl-12 bg-white border-slate-100 text-slate-900 h-14 rounded-2xl focus:ring-indigo-500 shadow-sm transition-all"
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="brand"
              disabled={loading}
              className="w-full h-14 text-lg rounded-2xl shadow-xl shadow-indigo-200 mt-4 font-bold"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {error && <p className="text-sm text-red-500 mt-4 text-center">{error}</p>}
          </form>
          <div className="mt-10 text-center text-sm">
            <span className="text-slate-500 font-medium">Chưa có tài khoản? </span>
            <button
              onClick={() => navigate('/register')}
              className="font-black text-indigo-600 hover:underline underline-offset-4 decoration-2"
            >
              Đăng ký ngay
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
