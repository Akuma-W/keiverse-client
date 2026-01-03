import type { ID, Timestamped } from './common.type';

export type ResourceType = 'video' | 'file' | 'link';

export interface Resource extends Timestamped {
  resourceId: ID;
  classId: ID;
  title: string;
  url: string;
  type: ResourceType;
  size?: number;
}
