'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { PostDetail } from '@/components/PostDetail';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { api, queryKeys } from '@/lib/api';
import { useScreenNavigation } from '@/lib/navigation';
import { useAppStore } from '@/stores/appStore';
import { GroupBuyItem } from '@/types';

export function DetailPage({ itemId }: { itemId: string }) {
  const queryClient = useQueryClient();
  const currentUserName = useAppStore((state) => state.currentUserName);
  const setCurrentUserName = useAppStore((state) => state.setCurrentUserName);
  const { data: items = [], isLoading } = useQuery({ queryKey: queryKeys.items, queryFn: api.items });
  const item = items.find((it) => it.id === itemId) ?? items[0];
  const navigate = useScreenNavigation(item?.id);

  useEffect(() => {
    const storedUserName = localStorage.getItem('sobunsobun_current_user_name') ?? sessionStorage.getItem('sobunsobun_current_user_name');
    if (storedUserName) setCurrentUserName(storedUserName);
  }, [setCurrentUserName]);

  if (isLoading) return <LoadingSkeleton type="detail" />;
  if (!item) return <LoadingSkeleton type="detail" />;

  const toggleLike = (id: string) => {
    queryClient.setQueryData<GroupBuyItem[]>(queryKeys.items, (old = []) =>
      old.map((it) => it.id === id ? { ...it, isLiked: !it.isLiked } : it)
    );
  };

  const deleteItem = async () => {
    await api.deleteItem(item.id, currentUserName);
    queryClient.setQueryData<GroupBuyItem[]>(queryKeys.items, (old = []) => old.filter((it) => it.id !== item.id));
    navigate('home');
  };

  return (
    <PostDetail
      item={item}
      canDelete={item.hostName === currentUserName}
      onNavigate={navigate}
      onToggleLike={toggleLike}
      onDelete={deleteItem}
    />
  );
}
