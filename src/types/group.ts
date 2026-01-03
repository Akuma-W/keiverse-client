import type { ID, Timestamped } from './common.type';

export interface Group extends Timestamped {
  groupId: ID;
  classId: ID;
  name: string;
  createdBy: ID;
}

export interface GroupMember {
  memberId: ID;
  groupId: ID;
  userId: ID;
  joinedAt?: string;
}
