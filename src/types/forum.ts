import type { ID, Timestamped } from './common.type';

type ForumVisibility = 'public' | 'private';

export interface ForumPost extends Timestamped {
  postId: ID;
  classId: ID;
  authorId: ID;
  parentId?: ID;
  title?: string;
  content: string;
  isAnonymus: boolean;
  visibility: ForumVisibility;
}
