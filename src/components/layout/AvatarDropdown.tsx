import { LogOut, School, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AvatarDropdown = () => {
  const { user, userRole, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full focus:outline-none">
          <Avatar>
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem>
          <p className="font-bold">{user.fullName}</p>
          {userRole === 'student' && 'HV'}
          {userRole === 'teacher' && 'GV'}
          {userRole === 'admin' && 'AD'}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => navigate(`/profile`)}>
          <User className="mr-2 h-4 w-4" />
          Thông tin cá nhân
        </DropdownMenuItem>

        {user.role.name === 'teacher' && (
          <DropdownMenuItem onClick={() => navigate('dashboard')}>
            <School className="mr-2 h-4 w-4" />
            Quản lý lớp học
          </DropdownMenuItem>
        )}

        {user.role.name === 'admin' && (
          <DropdownMenuItem onClick={() => navigate('admin')}>
            <Settings className="mr-2 h-4 w-4" />
            Quản lý hệ thống
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-600" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
