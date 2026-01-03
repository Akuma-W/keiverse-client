export interface User {
  id: number;
  fullName: string;
  email: string;
  username: string;
  role: string;
  isLocked: boolean;
  imageUrl?: string;
}

export interface CreateUserDto {
  fullName: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface UpdateUserDto {
  fullName?: string;
  email?: string;
  role?: string;
}

export interface QueryUsersDto {
  page?: number;
  limit?: number;
  search?: string;
}
