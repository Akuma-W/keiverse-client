export interface Role {
  id: number;
  name: string;
  description?: string;
}

export interface CreateRoleDto {
  name: string;
  description?: string;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
}

export interface QueryRolesDto {
  page?: number;
  limit?: number;
}
