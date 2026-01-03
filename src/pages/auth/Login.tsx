import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { type FormEvent, useEffect, useState } from 'react';
import { loginThunk } from '@/features/auth/auth.slice';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Login = () => {
  usePageTitle({ title: 'Login' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (accessToken) {
      navigate('/dashboard');
    }
  }, [accessToken, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginThunk({ identifier, password })).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Đăng nhập</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Username */}
          <div className="space-y-2">
            <Label>Tên đăng nhập</Label>
            <Input
              autoComplete="username"
              id="username"
              type="text"
              placeholder="student123"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-end justify-end">
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </Button>

          <p className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Login;
