'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Notifications } from '@/components/Notifications';
import { api, queryKeys } from '@/lib/api';
import { useScreenNavigation } from '@/lib/navigation';
import { NotificationItem } from '@/types';

export function NotificationsPage() {
  const queryClient = useQueryClient();
  const navigate = useScreenNavigation();
  const { data: notifications = [], isLoading } = useQuery({ queryKey: queryKeys.notifications, queryFn: api.notifications });

  const markAllRead = async () => {
    try {
      await Promise.all(notifications.filter((n) => !n.read).map((n) => api.updateNotification(n.id, { read: true })));
      queryClient.setQueryData<NotificationItem[]>(queryKeys.notifications, (old = []) => old.map((n) => ({ ...n, read: true })));
    } catch {
      alert('알림 읽음 처리에 실패했습니다.');
    }
  };

  const selectNotification = async (notification: NotificationItem) => {
    try {
      await api.updateNotification(notification.id, { read: true });
      queryClient.setQueryData<NotificationItem[]>(queryKeys.notifications, (old = []) =>
        old.map((n) => n.id === notification.id ? { ...n, read: true } : n)
      );
      if (notification.targetScreen) navigate(notification.targetScreen);
    } catch {
      alert('알림 읽음 처리에 실패했습니다.');
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  return <Notifications notifications={notifications} onNavigate={navigate} onMarkAllRead={markAllRead} onSelectNotification={selectNotification} />;
}
