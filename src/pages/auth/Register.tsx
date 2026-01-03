import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerThunk } from '@/features/auth/auth.slice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    school: '',
    role: 'student' as 'student' | 'teacher',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      username: form.username,
      password: form.password,
      fullName: form.fullName,
      role: form.role,
      ...(form.email.trim() && { email: form.email }),
      ...(form.phone.trim() && { phone: form.phone }),
      ...(form.school.trim() && { school: form.school }),
    };

    console.log('SEND REGISTER PAYLOAD:', payload);

    const result = await dispatch(registerThunk(payload as any));

    if (registerThunk.fulfilled.match(result)) {
      navigate('/login');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Create Account</CardTitle>
      </CardHeader>

      <form onSubmit={handleRegister}>
        <CardContent className="space-y-4">
          {/* Username */}
          <div className="space-y-1">
            <Label>Username</Label>
            <Input
              name="username"
              required
              placeholder="student123"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          {/* Full name */}
          <div className="space-y-1">
            <Label>Full Name</Label>
            <Input
              name="fullName"
              required
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              required
              placeholder="******"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <Label>Phone (optional)</Label>
            <Input
              name="phone"
              placeholder="+84123456789"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* School */}
          <div className="space-y-1">
            <Label>School (optional)</Label>
            <Input
              name="school"
              placeholder="University of Technology"
              value={form.school}
              onChange={handleChange}
            />
          </div>

          {/* Role */}
          <div className="space-y-1">
            <Label>Role</Label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>

          <div className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link className="text-blue-600 hover:underline" to="/login">
              Login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterPage;
