export interface Classroom {
  id: number;
  title: string;
  description: string;
  code: string;
  teacherId: number;
  createdAt: string;

  termStart: string;
  termEnd: string;

  teacher: {
    id: number;
    username: string;
    fullName: string;
  };
}

export interface CreateClassroomDto {
  title: string;
  description: string;
}

export interface JoinClassroomDto {
  code: string;
}

export interface QueryClassroomParams {
  page?: number;
  limit?: number;
  search?: string;
}
