import type { ID, Timestamped } from './common.type';

export type NotificationChannel = 'email' | 'sms' | 'app';

export interface Notification extends Timestamped {
  notificationId: ID;
  userId: ID;
  type: string;
  title?: string;
  content: string;
  relatedType?: string;
  relatedId?: ID;
  isRead?: boolean;
  channel: NotificationChannel;
}
