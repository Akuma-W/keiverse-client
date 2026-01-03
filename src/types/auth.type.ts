export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
}

export interface LoginDto {
  identifier: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  fullName: string;
  email?: string;
  phone?: string;
  school?: string;
  role: 'student' | 'teacher';
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}
